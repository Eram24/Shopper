
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  const ClientID = "AQdGyNFzdvJ6VISfLLuNSi65eY2GXMgDVgk_dlUKLt9ffX1CmJVS-QImlumEutB19dTfRro00g6WihDU";

  return (
    <PayPalScriptProvider
      options={{
        clientId: ClientID,
        currency: "USD",
        intent: "capture"
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}

        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: parseFloat(amount).toFixed(2)
                }
              }
            ]
          }).then((orderId) => {
            return orderId;
          });
        }}

        onApprove={(data, actions) =>{          
          return actions.order.capture()
            .then((details) => {
              onSuccess(details); // call your function with full details
            })
            .catch((err) => {
              onError(err);
            });
        }}

        onError={(err) => {
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
