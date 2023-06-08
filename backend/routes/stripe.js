import express from "express";
import Stripe from "stripe";
import Order from "../models/orderModel.js";
import dotenv from "dotenv";
dotenv.config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  //   console.log(req.body.cartItems);
  const orderItems = req.body.cartItems.map(
    ({
      description,
      rating,
      numReviews,
      countInStock,
      createdAt,
      updatedAt,
      reviews,
      __v,
      ...rest
    }) => {
      return rest;
    }
  );
  //   console.log(orderItems);
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      orderItems: JSON.stringify(orderItems),
    },
  });

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          //   images: [item.image],
          //   description: item._id,
          metadata: {
            itemId: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.currentQuantity,
      //   metadata: {
      //     itemId: item._id,
      //   },
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    // shipping_address_collection: {
    //   allowed_countries: ["US", "CA"],
    // },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      //   {
      //     shipping_rate_data: {
      //       type: "fixed_amount",
      //       fixed_amount: {
      //         amount: 1500,
      //         currency: "usd",
      //       },
      //       display_name: "Next day air",
      //       // Delivers in exactly 1 business day
      //       delivery_estimate: {
      //         minimum: {
      //           unit: "business_day",
      //           value: 1,
      //         },
      //         maximum: {
      //           unit: "business_day",
      //           value: 1,
      //         },
      //       },
      //     },
      //   },
    ],
    phone_number_collection: {
      enabled: true,
    },

    line_items,
    mode: "payment",
    customer: customer.id,
    metadata: { userId: req.body.userId },
    success_url: `${process.env.CLIENT_URL}/placeorder`,
    cancel_url: `${process.env.CLIENT_URL}/payment`,
  });

  // res.redirect(303, session.url);
  res.send({ url: session.url });
});

// Create order function

// const createOrder = async (customer, data) => {
//   // stripe.checkout.sessions.listLineItems(
//   //   "cs_test_b14nVDexCBF1Um31NdQuG1hM4O1NSatxQkHc0jW8KTAtQW8Dfqjiko0QAG",
//   //   function (err, lineItems) {
//   //     const orderItems = lineItems;
//   //     console.log(lineItems);
//   //     console.log(lineItems.data[0]);
//   //   }
//   // );

//   const items = JSON.parse(customer.metadata.orderItems);

//   const orderItems = items.map((item) => {
//     return {
//       brand: item.brand,
//       category: item.category,
//       currentQuantity: item.cartQuantity,
//       image: item.image,
//       name: item.name,
//       price: item.price,
//       _id: item.id,
//     };
//   });

//   const newOrder = new Order({
//     orderItems,
//     shippingAddress: {
//       address: data.customer_details.line1 + data.customer_details.line2,
//       city: data.customer_details.city,
//       state: data.customer_details.state,
//       postalCode: data.customer_details.postal_code,
//       country: data.customer_details.countrty,
//     },
//     paymentMethod: "Stripe",
//     paymentResult: {
//       id: data.customer,
//       status: data.payment_status,
//       email_address: customer.email,
//     },
//     shippingPrice: data.shipping_cost.amount_total,
//     totalPrice: data.amount_total,
//     paymentIntentId: data.payment_intent,
//     userId: customer.metadata.userId,
//   });

//   try {
//     const savedOrder = await newOrder.save();
//     console.log("Processed Order:", savedOrder);
//   } catch (err) {
//     console.log(err);
//   }
// };

// Stripe webhoook

router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (req, res) => {
    let data;
    let eventType;

    // Check if webhook signing is configured.
    let webhookSecret;
    //webhookSecret = process.env.STRIPE_WEB_HOOK;

    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data.object;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          console.log(customer);
          console.log("data", data);

          try {
            // CREATE ORDER
            createOrder(customer, data);
          } catch (err) {
            console.log(typeof createOrder);
            console.log(err);
          }
        })
        .catch((err) => console.log(err.message));
    }

    res.status(200).end();
  }
);

export default router;
