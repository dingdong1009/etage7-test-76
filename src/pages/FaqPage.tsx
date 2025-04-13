
import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const FaqPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const faqCategories = [
    {
      title: "For Brands",
      questions: [
        {
          question: "How do I create a brand account on ETAGE7?",
          answer: "To create a brand account, visit our homepage and click on the 'Register' button. Select 'Brand' as your account type and follow the registration steps. You'll need to provide information about your brand, including product categories, pricing range, and images of your collections."
        },
        {
          question: "What are the fees for brands on ETAGE7?",
          answer: "ETAGE7 offers different subscription tiers for brands. Our basic tier is commission-based, while premium tiers offer additional features for a monthly fee. Visit our Pricing page for detailed information on each subscription tier and its benefits."
        },
        {
          question: "How do I upload my collection to ETAGE7?",
          answer: "After logging into your brand dashboard, navigate to the 'Products' section. Here, you can upload your collection either individually or in bulk using our template. Each product requires images, detailed descriptions, pricing, and availability information."
        }
      ]
    },
    {
      title: "For Buyers",
      questions: [
        {
          question: "How do I create a buyer account?",
          answer: "To create a buyer account, click the 'Register' button on our homepage and select 'Buyer.' You'll need to verify your business by providing relevant documentation such as business registration or retail license, which helps us maintain a verified marketplace."
        },
        {
          question: "Is it free to use ETAGE7 as a buyer?",
          answer: "Yes, creating and maintaining a buyer account is completely free. Buyers can browse collections, connect with brands, and place orders without any platform fees."
        },
        {
          question: "How do I place an order with a brand?",
          answer: "Browse collections, select the items you wish to purchase, and add them to your cart. Review your order and submit it through our secure platform. The brand will receive your order and respond with confirmation, typically within 48 hours."
        }
      ]
    },
    {
      title: "Orders & Shipping",
      questions: [
        {
          question: "How are shipping costs calculated?",
          answer: "Shipping costs are determined by the brand based on your location, order size, and shipping method selected. These costs are clearly displayed during checkout before order confirmation."
        },
        {
          question: "What is the typical lead time for orders?",
          answer: "Lead times vary by brand and whether items are made-to-order or in stock. Typically, in-stock items ship within 1-2 weeks, while made-to-order pieces may take 3-8 weeks. Each product listing includes estimated lead times."
        },
        {
          question: "Can I modify my order after it's been placed?",
          answer: "Order modifications may be possible depending on the order status. Contact the brand directly through our messaging system as soon as possible. Once an order is marked 'In Production,' modifications are typically no longer possible."
        }
      ]
    },
    {
      title: "Platform & Technical Support",
      questions: [
        {
          question: "What browsers are supported by ETAGE7?",
          answer: "ETAGE7 supports the latest versions of Chrome, Safari, Firefox, and Edge. For optimal performance, we recommend keeping your browser updated to the latest version."
        },
        {
          question: "I'm experiencing technical issues with the platform. What should I do?",
          answer: "First, try clearing your browser cache and cookies, then restart your browser. If issues persist, please contact our support team at support@etage7.com with details about the problem, including screenshots if possible."
        },
        {
          question: "Is ETAGE7 available as a mobile app?",
          answer: "Currently, ETAGE7 is optimized for web browsers on both desktop and mobile devices. While we don't have a dedicated mobile app yet, our responsive design ensures a seamless experience on any device."
        }
      ]
    }
  ];

  // Filter questions based on search term
  const filteredFaqs = searchTerm.trim() === '' 
    ? faqCategories 
    : faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(
          q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
               q.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.questions.length > 0);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-light tracking-tighter mt-12 mb-10">Frequently Asked Questions</h1>
      
      <div className="relative mb-12">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search questions..."
          className="pl-10 py-6 border-gray-300 focus:border-black rounded-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-10">
        {filteredFaqs.map((category, categoryIndex) => (
          category.questions.length > 0 && (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-light tracking-tighter mb-6">{category.title}</h2>
              <Accordion type="single" collapsible className="border-t border-gray-200">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`} className="border-b border-gray-200">
                    <AccordionTrigger className="text-left hover:no-underline py-4 font-light">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )
        ))}

        {filteredFaqs.every(category => category.questions.length === 0) && (
          <div className="text-center py-10">
            <p className="text-gray-500">No results found for "{searchTerm}"</p>
            <p className="text-gray-500 mt-2">Try different keywords or browse all questions above</p>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 mt-16 pt-10 text-center">
        <h3 className="text-xl font-light mb-4">Still have questions?</h3>
        <p className="text-gray-600 mb-6">
          Our support team is ready to help you with any additional questions.
        </p>
        <div className="space-x-4">
          <a href="mailto:support@etage7.com" className="underline text-black">Email Support</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="underline text-black">Live Chat</a>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
