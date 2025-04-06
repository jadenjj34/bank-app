"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock FAQ data
const faqData = [
  {
    category: "Account Management",
    questions: [
      {
        question: "How do I change my password?",
        answer:
          "To change your password, go to Settings > Security, then click on 'Change Password'. You'll need to enter your current password and then your new password twice to confirm.",
      },
      {
        question: "How do I update my contact information?",
        answer:
          "You can update your contact information by going to Settings > Account. There you can edit your email, phone number, and address information.",
      },
      {
        question: "What should I do if I forget my username or password?",
        answer:
          "If you forget your username or password, click on the 'Forgot Username/Password' link on the login page. You'll be asked to verify your identity, and then you can reset your credentials.",
      },
    ],
  },
  {
    category: "Transfers & Payments",
    questions: [
      {
        question: "How long do transfers between accounts take?",
        answer:
          "Transfers between your own Hamilton Bank accounts are processed immediately. Transfers to other Hamilton Bank customers typically process within minutes. Transfers to external banks usually take 1-3 business days.",
      },
      {
        question: "Is there a limit on how much money I can transfer?",
        answer:
          "Yes, there are daily and monthly limits on transfers. The standard daily limit is £5,000 and the monthly limit is £20,000. You can request an increase to these limits by contacting customer support.",
      },
      {
        question: "How do I set up automatic payments?",
        answer:
          "To set up automatic payments, go to Payments > Scheduled Payments and click on 'Create New'. You can then select the payee, amount, frequency, and start date for your automatic payment.",
      },
    ],
  },
  {
    category: "Mobile & Online Banking",
    questions: [
      {
        question: "How do I download the mobile app?",
        answer:
          "Our mobile app is available for download on the Apple App Store for iOS devices and Google Play Store for Android devices. Simply search for 'Hamilton Bank' and look for our official app.",
      },
      {
        question: "Is mobile banking secure?",
        answer:
          "Yes, our mobile banking app uses industry-leading security measures including encryption, multi-factor authentication, and biometric login options. We also monitor for suspicious activity 24/7.",
      },
      {
        question: "What features are available in the mobile app?",
        answer:
          "Our mobile app allows you to check balances, transfer funds, pay bills, deposit checks remotely, view statements, locate ATMs and branches, and receive account alerts.",
      },
    ],
  },
  {
    category: "Cards & ATMs",
    questions: [
      {
        question: "How do I report a lost or stolen card?",
        answer:
          "If your card is lost or stolen, please call our 24/7 customer service line immediately at 1-800-HAMILTON. You can also temporarily freeze your card through the mobile app or online banking.",
      },
      {
        question: "Are there fees for using non-Hamilton Bank ATMs?",
        answer:
          "Hamilton Bank does not charge fees for using our ATMs. For non-Hamilton Bank ATMs, there may be a fee from both Hamilton Bank and the ATM operator. Premium account holders receive up to 5 non-Hamilton Bank ATM fee refunds per month.",
      },
      {
        question: "How do I change my card PIN?",
        answer:
          "You can change your card PIN by visiting any Hamilton Bank ATM, calling customer service, or through the security section of our mobile app and online banking.",
      },
    ],
  },
]

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const filteredFAQs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search FAQs..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredFAQs.length > 0 ? (
        filteredFAQs.map((category, index) => (
          <div key={index} className="space-y-2">
            <h3
              className="font-medium text-lg cursor-pointer flex items-center"
              onClick={() => toggleCategory(category.category)}
            >
              {category.category}
            </h3>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((faq, faqIndex) => (
                <AccordionItem key={faqIndex} value={`item-£{index}-£{faqIndex}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))
      ) : (
        <div className="text-center py-6 text-gray-500">No FAQs found matching your search</div>
      )}
    </div>
  )
}

