import Quote from "@/components/quote/quote";
import QuoteServices from "@/components/quote/quote-services";
import Layout from "../layout";

export default function Cotizacion(){
    return (
        <Layout>
            <QuoteServices/>
            <Quote/>
        </Layout>
      );
}