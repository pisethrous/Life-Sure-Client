import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import useTitle from "../../../Hooks/useTitle";
import useAuthContext from "../../../Hooks/useAuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import toast from "react-hot-toast";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1a202c",
      "::placeholder": {
        color: "#a0aec0",
      },
    },
    invalid: {
      color: "#e53e3e",
    },
  },
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [Error, setError] = useState("");
  const navigate = useNavigate(); // ✅ Added
  useTitle("Payment");
  const {id} = useParams();

  const { user } = useAuthContext();

  const AxiosSecure = useAxiosSecure();
  const { data: application = {}, isPending } = useQuery({
    queryKey: ["applications", id],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/applications/${id}`);
      return res.data;
    },
  });
  console.log(application);

  const bdtAmount = application?.quoteData?.monthlyPremium; 
const exchangeRate = 117;

const usdAmount = bdtAmount / exchangeRate; 


const amountInCents = Math.round(usdAmount * 100); 



  isPending && <Loading></Loading>;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error);
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
    }
    const res = await AxiosSecure.post("/create-payment-intent", {
      amountInCents,
      id,
    });
    const clientSecret = res.data.clientSecret;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });
    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("payment succeed!");
        const paymentData = {
          userEmail: user.email,
          policyTitle: application.policyTitle,
          amount: bdtAmount,
          frequency: "monthly",
          paidAt: new Date(),
          TransitionId: application._id,
        };
        if (!application._id) {
  toast.error("Invalid application ID");
  return;
}
      
        await AxiosSecure.patch(`/applications/pay/${application._id}`);
        await AxiosSecure.post("/payment-history", paymentData);
        toast.success("✅ Payment successful!");

        // ✅ Redirect after short delay
        setTimeout(() => {
          navigate("/dashboard/customer/payments");
        }, 1500);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Pay for the {application.policyTitle}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border rounded p-3">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-primary/80 text-black  py-2 px-4 rounded hover:bg-primary disabled:opacity-50"
        >
          Pay {bdtAmount} Tk
        </button>
        {Error && <p className="text-sm text-red-500">{Error.message}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
