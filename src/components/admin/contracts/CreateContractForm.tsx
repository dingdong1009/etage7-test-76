
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Bot } from "lucide-react";

interface CreateContractFormProps {
  onSubmit: (data: any) => void;
}

const CreateContractForm = ({ onSubmit }: CreateContractFormProps) => {
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [activeAITab, setActiveAITab] = useState("russianLaw");

  const contractForm = useForm({
    defaultValues: {
      name: "",
      type: "",
      language: "",
      content: "",
      visibleTo: "both"
    }
  });

  const generateAISuggestion = () => {
    setIsAIGenerating(true);
    
    // This would typically be an API call to an AI service
    setTimeout(() => {
      const contractType = contractForm.getValues("type");
      const language = contractForm.getValues("language");
      let suggestion = "";
      
      if (activeAITab === "russianLaw") {
        suggestion = language === "RU" ? 
          `Шаблон ${contractType === "sales" ? "договора купли-продажи" : 
                    contractType === "partnership" ? "партнерского контракта" :
                    contractType === "brand" ? "договора с брендом" : "договора с покупателем"} 
          
          ДОГОВОР №___
          
          г. Москва                                                                «___» _________ 2024 г.
          
          ООО «______», в лице директора _________, действующего на основании _________, именуемое в дальнейшем «Сторона 1», с одной стороны, и
          
          ООО «______», в лице директора _________, действующего на основании _________, именуемое в дальнейшем «Сторона 2», с другой стороны,
          
          заключили настоящий Договор о нижеследующем:
          
          1. ПРЕДМЕТ ДОГОВОРА
          1.1. Сторона 1 обязуется предоставить/передать следующие товары/услуги: _________, а Сторона 2 обязуется принять и оплатить их в порядке и сроки, предусмотренные настоящим Договором.` 
          : 
          `Template for a ${contractType === "sales" ? "sales contract" : 
                              contractType === "partnership" ? "partnership agreement" :
                              contractType === "brand" ? "brand agreement" : "buyer agreement"} according to Russian law (in English)
          
          CONTRACT No. ___
          
          Moscow                                                                 "___" _________ 2024
          
          LLC "______", represented by the director _________, acting on the basis of _________, hereinafter referred to as "Party 1", on the one hand, and
          
          LLC "______", represented by the director _________, acting on the basis of _________, hereinafter referred to as "Party 2", on the other hand,
          
          have entered into this Contract as follows:
          
          1. SUBJECT OF THE CONTRACT
          1.1. Party 1 undertakes to provide/transfer the following goods/services: _________, and Party 2 undertakes to accept and pay for them in the manner and terms provided for in this Contract.`;
      } else {
        suggestion = language === "RU" ? 
          `Шаблон международного ${contractType === "sales" ? "договора купли-продажи" : 
                          contractType === "partnership" ? "партнерского контракта" :
                          contractType === "brand" ? "договора с брендом" : "договора с покупателем"} 
          
          МЕЖДУНАРОДНЫЙ ДОГОВОР №___
          
          Место заключения: _________                              Дата: «___» _________ 2024 г.
          
          Компания «______», юридическое лицо, зарегистрированное в соответствии с законодательством _________, в лице _________, действующего на основании _________, именуемая в дальнейшем «Сторона 1», с одной стороны, и
          
          Компания «______», юридическое лицо, зарегистрированное в соответствии с законодательством _________, в лице _________, действующего на основании _________, именуемая в дальнейшем «Сторона 2», с другой стороны,
          
          совместно именуемые «Стороны», заключили настоящий Международный Договор о нижеследующем:

          1. ПРЕДМЕТ ДОГОВОРА
          1.1. Сторона 1 обязуется предоставить/передать следующие товары/услуги: _________, а Сторона 2 обязуется принять и оплатить их в порядке и сроки, предусмотренные настоящим Договором.
          
          2. ПРИМЕНИМОЕ ПРАВО
          2.1. Настоящий Договор регулируется Конвенцией ООН о договорах международной купли-продажи товаров (Венская конвенция 1980 года) и применимым правом страны _________..`
          :
          `Template for an international ${contractType === "sales" ? "sales contract" : 
                                 contractType === "partnership" ? "partnership agreement" :
                                 contractType === "brand" ? "brand agreement" : "buyer agreement"} 
          
          INTERNATIONAL AGREEMENT No. ___
          
          Place: _________                                            Date: "___" _________ 2024
          
          Company "______", a legal entity registered in accordance with the laws of _________, represented by _________, acting on the basis of _________, hereinafter referred to as "Party 1", on the one hand, and
          
          Company "______", a legal entity registered in accordance with the laws of _________, represented by _________, acting on the basis of _________, hereinafter referred to as "Party 2", on the other hand,
          
          jointly referred to as the "Parties", have entered into this International Agreement as follows:

          1. SUBJECT OF THE AGREEMENT
          1.1. Party 1 undertakes to provide/transfer the following goods/services: _________, and Party 2 undertakes to accept and pay for them in the manner and terms provided for in this Agreement.
          
          2. APPLICABLE LAW
          2.1. This Agreement is governed by the United Nations Convention on Contracts for the International Sale of Goods (Vienna Convention 1980) and the applicable law of the country _________.`;
      }
      
      setAiSuggestion(suggestion);
      setIsAIGenerating(false);
    }, 1500);
  };

  const applyAISuggestion = () => {
    contractForm.setValue("content", aiSuggestion);
  };

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    contractForm.reset();
    setAiSuggestion("");
  };

  return (
    <div className="space-y-6">
      <Card className="border border-gray-200 shadow-none">
        <CardHeader>
          <CardTitle className="text-xl font-medium">Create New Contract Template</CardTitle>
          <CardDescription>
            Fill in the details below to create a new contract template
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...contractForm}>
            <form onSubmit={contractForm.handleSubmit(handleFormSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={contractForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contract Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contract template name" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={contractForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contract Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} required>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select contract type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sales">Sales Contract</SelectItem>
                          <SelectItem value="partnership">Partnership Contract</SelectItem>
                          <SelectItem value="brand">Brand Agreement</SelectItem>
                          <SelectItem value="buyer">Buyer Agreement</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={contractForm.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} required>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="EN">English</SelectItem>
                          <SelectItem value="RU">Russian</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={contractForm.control}
                  name="visibleTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visible To</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} required>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="brand">Brands Only</SelectItem>
                          <SelectItem value="buyer">Buyers Only</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={contractForm.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contract Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter contract content or use AI assistance below" 
                          className="min-h-[300px] font-mono" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Card className="border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Bot className="mr-2 h-4 w-4" />
                    AI Contract Assistant
                  </CardTitle>
                  <CardDescription>
                    Get help drafting your contract with specialized AI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Tabs value={activeAITab} onValueChange={setActiveAITab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="russianLaw">Russian Law Expert</TabsTrigger>
                        <TabsTrigger value="internationalLaw">International Law Expert</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        onClick={generateAISuggestion}
                        disabled={isAIGenerating || !contractForm.getValues("type") || !contractForm.getValues("language")}
                        className="flex-grow"
                      >
                        {isAIGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>Generate Contract Template</>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={applyAISuggestion}
                        disabled={!aiSuggestion}
                      >
                        Apply to Contract
                      </Button>
                    </div>
                    
                    {aiSuggestion && (
                      <div className="border border-gray-200 rounded-md p-4 bg-gray-50 overflow-auto max-h-[200px]">
                        <pre className="text-xs whitespace-pre-wrap font-mono">{aiSuggestion}</pre>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-black text-white"
                >
                  Create Contract Template
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateContractForm;
