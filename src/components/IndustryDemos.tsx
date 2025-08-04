import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDown, Globe, Zap, Shield, Send, Bot, User, Calendar, Clock, Check } from 'lucide-react';

interface IndustryDemo {
  key: string;
  title: string;
  description: string;
  conversation: string;
}



interface Message {
  id: string;
  type: 'bot' | 'user' | 'system' | 'booking';
  content: string;
  timestamp: Date;
  bookingData?: {
    availableSlots: string[];
    selectedDate?: string;
    selectedTime?: string;
  };
}

const IndustryDemos: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('restaurant');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get all demo options from translations
  const getDemoOptions = (): IndustryDemo[] => {
    // Use hardcoded demos since translations are already defined
    return [
      { key: 'restaurant', title: 'Restaurang', description: 'Bordbokningar, menufrågor', conversation: 'Restaurang Chat' },
      { key: 'salon', title: 'Salong & Skönhet', description: 'Tidsbokningar, behandlingsråd', conversation: 'Salong Chat' },
      { key: 'drivingSchool', title: 'Körskola', description: 'Lektionbokningar, teoriprov', conversation: 'Körskola Chat' },
      { key: 'library', title: 'Bibliotek', description: 'Boklån, rumreservationer', conversation: 'Bibliotek Chat' },
      { key: 'dentist', title: 'Tandläkare', description: 'Tandvårdstider, behandlingsråd', conversation: 'Tandläkare Chat' },
      { key: 'physio', title: 'Fysioterapi', description: 'Behandlingstider, rehabilitering', conversation: 'Fysioterapi Chat' },
      { key: 'massage', title: 'Massage', description: 'Massagebokningar, behandlingstyper', conversation: 'Massage Chat' },
      { key: 'lawyer', title: 'Advokat', description: 'Konsultationer, ärendestatus', conversation: 'Advokat Chat' },
      { key: 'consultant', title: 'Konsult', description: 'Projektplanering, mötesbokningar', conversation: 'Konsult Chat' },
      { key: 'gym', title: 'Gym & Träning', description: 'Medlemskap, träningspass', conversation: 'Gym Chat' }
    ];
  };

  const demoOptions = getDemoOptions();
  const currentDemo = demoOptions.find(demo => demo.key === selectedIndustry);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    const chatContainer = document.querySelector('.chat-messages-container') as HTMLElement;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100); // Small delay to ensure DOM is updated
    
    return () => clearTimeout(timeoutId);
  }, [messages]);

  // Initialize conversation when industry changes
  useEffect(() => {
    // Clear any existing automated conversation
    setMessages([]);
    
    const welcomeMessage = {
      id: `welcome-${Date.now()}`,
      type: 'bot' as const,
      content: currentLanguage.code === 'sv' 
        ? `Hej! Välkommen till ${currentDemo?.title}. Jag är din AI-receptionist. Hur kan jag hjälpa dig idag?`
        : `Hi! Welcome to ${currentDemo?.title}. I'm your AI receptionist. How can I help you today?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    
    // Start automated conversation after 2 seconds
    const timeoutId = setTimeout(() => {
      startAutomatedConversation();
    }, 2000);
    
    // Cleanup timeout on unmount or dependency change
    return () => clearTimeout(timeoutId);
  }, [selectedIndustry, currentLanguage.code, currentDemo?.title]);

  // Automated conversation flow
  const startAutomatedConversation = () => {
    const conversationSteps = getConversationSteps();
    let currentStep = 0;
    let conversationId = Date.now(); // Unique ID for this conversation cycle

    const addAutomatedMessage = () => {
      if (currentStep >= conversationSteps.length) {
        // Loop back to beginning after 3 seconds
        setTimeout(() => {
          conversationId = Date.now(); // New unique ID for next cycle
          setMessages([{
            id: `restart-${conversationId}`,
            type: 'bot' as const,
            content: currentLanguage.code === 'sv' 
              ? `Hej igen! Välkommen tillbaka till ${currentDemo?.title}. Hur kan jag hjälpa dig idag?`
              : `Hi again! Welcome back to ${currentDemo?.title}. How can I help you today?`,
            timestamp: new Date()
          }]);
          currentStep = 0;
          setTimeout(addAutomatedMessage, 2000);
        }, 3000);
        return;
      }

      const step = conversationSteps[currentStep];
      const message = {
        id: `auto-${conversationId}-${currentStep}`,
        type: step.type as 'bot' | 'user',
        content: step.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, message]);
      currentStep++;

      // Add next message after delay
      setTimeout(addAutomatedMessage, step.delay || 2000);
    };

    addAutomatedMessage();
  };

  const getConversationSteps = () => {
    const isSwedish = currentLanguage.code === 'sv';
    const industry = selectedIndustry;

    const steps = {
      restaurant: isSwedish ? [
        { type: 'user', content: 'Hej! Jag vill boka ett bord för 4 personer ikväll', delay: 4000 },
        { type: 'bot', content: 'Hej! Välkommen till vår restaurang. Jag kan hjälpa dig med bordbokning för 4 personer ikväll. Låt mig kolla våra tillgängliga tider...', delay: 6000 },
        { type: 'booking', content: 'Bokningskalender', delay: 3000 },
        { type: 'user', content: 'Har ni några bord kvar klockan 19:00?', delay: 5000 },
        { type: 'bot', content: 'Ja, vi har faktiskt ett fint bord för 4 personer klockan 19:00! Det är ett bord vid fönstret. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 6000 },
        { type: 'user', content: 'Perfekt! Vad serverar ni för mat?', delay: 5000 },
        { type: 'bot', content: 'Vi serverar modern svensk mat med internationella influenser. Våra specialiteter inkluderar gravad lax, köttbullar med lingonsylt, och våra egna hamburgare. Vi har också vegetariska alternativ.', delay: 7000 },
        { type: 'user', content: 'Låter gott! Vad kostar en huvudrätt?', delay: 5000 },
        { type: 'bot', content: 'Våra huvudrätter kostar mellan 180-280 kr. Vi har också dagens lunch för 120 kr. Vill du veta mer om något specifikt?', delay: 6000 },
        { type: 'user', content: 'Ja, har ni några bord för 20:00 istället?', delay: 5000 },
        { type: 'bot', content: 'Låt mig kolla i kalendern... Ja, vi har ett bord för 4 personer klockan 20:00 också! Det är också ett fint bord. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 },
        { type: 'user', content: 'Tack! Kan jag också fråga om parkering?', delay: 5000 },
        { type: 'bot', content: 'Ja, vi har gratis parkering bakom restaurangen. Det finns också gatu-parkering utanför. Vill du boka bordet för 19:00 eller 20:00?', delay: 6000 }
      ] : [
        { type: 'user', content: 'Hi! I want to book a table for 4 people tonight', delay: 4000 },
        { type: 'bot', content: 'Hello! Welcome to our restaurant. I can help you book a table for 4 people tonight. Let me check our available times...', delay: 6000 },
        { type: 'booking', content: 'Booking Calendar', delay: 3000 },
        { type: 'user', content: 'Do you have any tables left at 7:00 PM?', delay: 5000 },
        { type: 'bot', content: 'Yes, we actually have a nice table for 4 people at 7:00 PM! It\'s a window table. You can see all available times in the calendar above.', delay: 6000 },
        { type: 'user', content: 'Perfect! What kind of food do you serve?', delay: 5000 },
        { type: 'bot', content: 'We serve modern Swedish cuisine with international influences. Our specialties include gravad lax, meatballs with lingonberry jam, and our own hamburgers. We also have vegetarian options.', delay: 7000 },
        { type: 'user', content: 'Sounds delicious! How much does a main course cost?', delay: 5000 },
        { type: 'bot', content: 'Our main courses cost between 180-280 kr. We also have daily lunch for 120 kr. Would you like to know more about something specific?', delay: 6000 },
        { type: 'user', content: 'Yes, do you have any tables for 8:00 PM instead?', delay: 5000 },
        { type: 'bot', content: 'Let me check the calendar... Yes, we have a table for 4 people at 8:00 PM too! It\'s also a nice table. You can see all available times in the calendar above.', delay: 7000 },
        { type: 'user', content: 'Thanks! Can I also ask about parking?', delay: 5000 },
        { type: 'bot', content: 'Yes, we have free parking behind the restaurant. There\'s also street parking outside. Would you like to book the table for 7:00 PM or 8:00 PM?', delay: 6000 }
      ],
              salon: isSwedish ? [
          { type: 'user', content: 'Hej! Jag vill boka en tid för klippning', delay: 3000 },
          { type: 'bot', content: 'Hej! Välkommen till vår salong. Jag kan hjälpa dig med tidsbokning för klippning. Låt mig kolla våra tillgängliga tider...', delay: 4000 },
          { type: 'booking', content: 'Bokningskalender', delay: 2000 },
          { type: 'user', content: 'Perfekt! Vad för typ av klippning erbjuder ni?', delay: 3500 },
          { type: 'bot', content: 'Vi erbjuder herrklippning för 350 kr, damklippning för 450 kr och barnklippning för 250 kr. Vi har också skäggklippning för 150 kr. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 5000 },
          { type: 'user', content: 'Låter bra! Hur lång tid tar en herrklippning?', delay: 3500 },
          { type: 'bot', content: 'En herrklippning tar cirka 30 minuter. Om du vill ha både klippning och skäggklippning tar det cirka 45 minuter. Vi har också express-klippning för 250 kr som tar 20 minuter.', delay: 4500 },
          { type: 'user', content: 'Perfekt! Har ni också massage eller andra behandlingar?', delay: 3500 },
          { type: 'bot', content: 'Ja, vi erbjuder avslappnande massage för 600 kr och sportmassage för 700 kr. Vi har också ansiktsbehandlingar från 400 kr och manikyr/pedikyr från 300 kr. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 5000 },
          { type: 'user', content: 'Tack! Kan jag också fråga om ni har några specialerbjudanden?', delay: 3500 },
          { type: 'bot', content: 'Ja! Vi har studentrabatt 20% på alla klippningar. Vi har också en paketdeal: klippning + skäggklippning + massage för 900 kr istället för 1100 kr. Vill du veta mer om något specifikt?', delay: 4500 },
          { type: 'user', content: 'Ja, det låter intressant! Tack för all information.', delay: 3500 },
          { type: 'bot', content: 'Varsågod! Du kan boka din tid direkt i kalendern ovan. Vi ser fram emot att träffa dig!', delay: 4000 }
        ] : [
          { type: 'user', content: 'Hi! I want to book an appointment for a haircut', delay: 3000 },
          { type: 'bot', content: 'Hello! Welcome to our salon. I can help you book an appointment for a haircut. Let me check our available times...', delay: 4000 },
          { type: 'booking', content: 'Booking Calendar', delay: 2000 },
          { type: 'user', content: 'Perfect! What types of haircuts do you offer?', delay: 3500 },
          { type: 'bot', content: 'We offer men\'s haircuts for 350 kr, women\'s haircuts for 450 kr, and children\'s haircuts for 250 kr. We also have beard trimming for 150 kr. You can see all available times in the calendar above.', delay: 5000 },
          { type: 'user', content: 'Sounds good! How long does a men\'s haircut take?', delay: 3500 },
          { type: 'bot', content: 'A men\'s haircut takes about 30 minutes. If you want both haircut and beard trimming, it takes about 45 minutes. We also have express haircuts for 250 kr that take 20 minutes.', delay: 4500 },
          { type: 'user', content: 'Perfect! Do you also offer massage or other treatments?', delay: 3500 },
          { type: 'bot', content: 'Yes, we offer relaxing massage for 600 kr and sports massage for 700 kr. We also have facial treatments from 400 kr and manicure/pedicure from 300 kr. You can see all available times in the calendar above.', delay: 5000 },
          { type: 'user', content: 'Thanks! Can I also ask about any special offers?', delay: 3500 },
          { type: 'bot', content: 'Yes! We have student discount 20% on all haircuts. We also have a package deal: haircut + beard trimming + massage for 900 kr instead of 1100 kr. Would you like to know more about anything specific?', delay: 4500 },
          { type: 'user', content: 'Yes, that sounds interesting! Thanks for all the information.', delay: 3500 },
          { type: 'bot', content: 'You\'re welcome! You can book your time directly in the calendar above. We look forward to seeing you!', delay: 4000 }
        ],
      drivingSchool: isSwedish ? [
        { type: 'user', content: 'Hej! Jag vill boka en körlektion', delay: 4000 },
        { type: 'bot', content: 'Hej! Välkommen till vår körskola. Jag kan hjälpa dig med bokning av körlektion. Låt mig kolla våra tillgängliga tider...', delay: 6000 },
        { type: 'booking', content: 'Bokningskalender', delay: 3000 },
        { type: 'user', content: 'Vad kostar en körlektion?', delay: 5000 },
        { type: 'bot', content: 'En körlektion kostar 800 kr och inkluderar 45 minuter körning. Vi har också paket med 10 lektioner för 7000 kr. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 },
        { type: 'user', content: 'Perfekt! Hur många lektioner behöver jag egentligen?', delay: 5000 },
        { type: 'bot', content: 'Det beror på din erfarenhet och hur snabbt du lär dig. De flesta elever behöver 15-20 lektioner för att känna sig redo för uppkörning. Vi har också intensivkurser på 2 veckor.', delay: 7000 },
        { type: 'user', content: 'Ja, berätta mer om intensivkursen', delay: 5000 },
        { type: 'bot', content: 'Intensivkursen kostar 12000 kr och inkluderar 20 lektioner, teori och uppkörning. Vi kör 2-3 lektioner per dag under 2 veckor. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 },
        { type: 'user', content: 'Låter bra! Har ni också teorilektioner?', delay: 5000 },
        { type: 'bot', content: 'Ja, vi har teorilektioner varje tisdag och torsdag klockan 18:00. De kostar 200 kr per lektion eller 1500 kr för hela teorikursen. Vi har också online-teori.', delay: 6000 },
        { type: 'user', content: 'Tack! Kan jag också fråga om ni har några specialerbjudanden?', delay: 5000 },
        { type: 'bot', content: 'Ja! Vi har studentrabatt 15% på alla lektioner. Vi har också en paketdeal: 20 lektioner + teori + uppkörning för 15000 kr istället för 18000 kr. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 }
      ] : [
        { type: 'user', content: 'Hi! I want to book a driving lesson', delay: 4000 },
        { type: 'bot', content: 'Hello! Welcome to our driving school. I can help you book a driving lesson. Let me check our available times...', delay: 6000 },
        { type: 'booking', content: 'Booking Calendar', delay: 3000 },
        { type: 'user', content: 'How much does a driving lesson cost?', delay: 5000 },
        { type: 'bot', content: 'A driving lesson costs 800 kr and includes 45 minutes of driving. We also have packages with 10 lessons for 7000 kr. You can see all available times in the calendar above.', delay: 7000 },
        { type: 'user', content: 'Perfect! How many lessons do I actually need?', delay: 5000 },
        { type: 'bot', content: 'It depends on your experience and how quickly you learn. Most students need 15-20 lessons to feel ready for the driving test. We also have intensive courses over 2 weeks.', delay: 7000 },
        { type: 'user', content: 'Yes, tell me more about the intensive course', delay: 5000 },
        { type: 'bot', content: 'The intensive course costs 12000 kr and includes 20 lessons, theory and driving test. We drive 2-3 lessons per day for 2 weeks. You can see all available times in the calendar above.', delay: 7000 },
        { type: 'user', content: 'Sounds good! Do you also have theory lessons?', delay: 5000 },
        { type: 'bot', content: 'Yes, we have theory lessons every Tuesday and Thursday at 6:00 PM. They cost 200 kr per lesson or 1500 kr for the entire theory course. We also have online theory.', delay: 6000 },
        { type: 'user', content: 'Thanks! Can I also ask about any special offers?', delay: 5000 },
        { type: 'bot', content: 'Yes! We have student discount 15% on all lessons. We also have a package deal: 20 lessons + theory + driving test for 15000 kr instead of 18000 kr. You can see all available times in the calendar above.', delay: 7000 }
      ],
      library: isSwedish ? [
        { type: 'user', content: 'Hej! Jag vill låna en bok', delay: 4000 },
        { type: 'bot', content: 'Hej! Välkommen till vårt bibliotek. Jag kan hjälpa dig med boklån och rumreservationer. Låt mig kolla våra tillgängliga tider...', delay: 6000 },
        { type: 'booking', content: 'Bokningskalender', delay: 3000 },
        { type: 'user', content: 'Har ni några böcker om AI och framtiden?', delay: 5000 },
        { type: 'bot', content: 'Ja, vi har flera böcker om AI! Vi har "AI Revolution" av Sarah Chen, "Framtidens Teknologi" och "Machine Learning för Nybörjare". Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 },
        { type: 'user', content: 'Perfekt! Kan jag också reservera ett studierum?', delay: 5000 },
        { type: 'bot', content: 'Ja, vi har studierum för 2-6 personer. De kostar 50 kr per timme för enskilda och 100 kr per timme för grupper. Vi har också tysta rum för 30 kr per timme.', delay: 7000 },
        { type: 'user', content: 'Låter bra! Har ni också datorer tillgängliga?', delay: 5000 },
        { type: 'bot', content: 'Ja, vi har 15 datorer med internetåtkomst. De är gratis att använda i 2 timmar per dag. Vi har också skrivare för 2 kr per sida. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 },
        { type: 'user', content: 'Tack! Kan jag också fråga om ni har några evenemang?', delay: 5000 },
        { type: 'bot', content: 'Ja! Vi har bokklubbar varje tisdag klockan 18:00, författarvisningar varje lördag och barnaktiviteter på söndagar. Allt är gratis för medlemmar. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 6000 },
        { type: 'user', content: 'Fantastiskt! Hur länge kan jag låna böckerna?', delay: 5000 },
        { type: 'bot', content: 'Du kan låna böcker i 3 veckor och förnya upp till 2 gånger. Vi har också e-böcker som du kan låna i 2 veckor. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 }
      ] : [
        { type: 'user', content: 'Hi! I want to borrow a book', delay: 4000 },
        { type: 'bot', content: 'Hello! Welcome to our library. I can help you with book loans and room reservations. Let me check our available times...', delay: 6000 },
        { type: 'booking', content: 'Booking Calendar', delay: 3000 },
        { type: 'user', content: 'Do you have any books about AI and the future?', delay: 5000 },
        { type: 'bot', content: 'Yes, we have several books about AI! We have "AI Revolution" by Sarah Chen, "Future Technology" and "Machine Learning for Beginners". You can see all available times in the calendar above.', delay: 7000 },
        { type: 'user', content: 'Perfect! Can I also reserve a study room?', delay: 5000 },
        { type: 'bot', content: 'Yes, we have study rooms for 2-6 people. They cost 50 kr per hour for individuals and 100 kr per hour for groups. We also have quiet rooms for 30 kr per hour.', delay: 7000 },
        { type: 'user', content: 'Sounds good! Do you also have computers available?', delay: 5000 },
        { type: 'bot', content: 'Yes, we have 15 computers with internet access. They are free to use for 2 hours per day. We also have printers for 2 kr per page. You can see all available times in the calendar above.', delay: 7000 },
        { type: 'user', content: 'Thanks! Can I also ask about any events?', delay: 5000 },
        { type: 'bot', content: 'Yes! We have book clubs every Tuesday at 6:00 PM, author readings every Saturday and children\'s activities on Sundays. Everything is free for members. You can see all available times in the calendar above.', delay: 6000 },
        { type: 'user', content: 'Fantastic! How long can I borrow the books?', delay: 5000 },
        { type: 'bot', content: 'You can borrow books for 3 weeks and renew up to 2 times. We also have e-books that you can borrow for 2 weeks. You can see all available times in the calendar above.', delay: 7000 }
      ],
      dentist: isSwedish ? [
        { type: 'user', content: 'Hej! Jag har ont i tanden', delay: 4000 },
        { type: 'bot', content: 'Hej! Jag förstår att du har tandvärk. Vi har akuttider tillgängliga. Låt mig kolla våra tillgängliga tider...', delay: 6000 },
        { type: 'booking', content: 'Bokningskalender', delay: 3000 },
        { type: 'user', content: 'Kan jag få en tid idag? Det är ganska akut', delay: 5000 },
        { type: 'bot', content: 'Ja, vi har akuttider tillgängliga idag. En akutkonsultation kostar 800 kr. Vi tar emot alla vanliga försäkringar. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 },
        { type: 'user', content: 'Perfekt! Vad för behandlingar erbjuder ni?', delay: 5000 },
        { type: 'bot', content: 'Vi erbjuder allt från vanliga kontroller och rengöringar till rotfyllningar och kronor. Vi har också kosmetisk tandvård som blekning och tandreglering. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 },
        { type: 'user', content: 'Låter bra! Har ni också barnvänliga behandlingar?', delay: 5000 },
        { type: 'bot', content: 'Ja, vi har specialister inom barnodontologi. Vi gör allt för att barnen ska känna sig trygga och bekväma. Vi har också fluorbehandlingar och tätskikt. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 },
        { type: 'user', content: 'Tack! Kan jag också fråga om ni har några specialerbjudanden?', delay: 5000 },
        { type: 'bot', content: 'Ja! Vi har studentrabatt 20% på alla behandlingar. Vi har också familjepaket med 15% rabatt. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 6000 }
      ] : [
        { type: 'user', content: 'Hi! I have a toothache', delay: 4000 },
        { type: 'bot', content: 'Hi! I understand you have tooth pain. We have emergency appointments available. Let me check our available times...', delay: 6000 },
        { type: 'booking', content: 'Booking Calendar', delay: 3000 },
        { type: 'user', content: 'Can I get an appointment today? It\'s quite urgent', delay: 5000 },
        { type: 'bot', content: 'Yes, we have emergency appointments available today. An emergency consultation costs 800 kr. We accept all common insurance. You can see all available times in the calendar above.', delay: 7000 },
        { type: 'user', content: 'Perfect! What treatments do you offer?', delay: 5000 },
        { type: 'bot', content: 'We offer everything from regular check-ups and cleanings to root canals and crowns. We also have cosmetic dentistry like whitening and orthodontics. You can see all available times in the calendar above.', delay: 7000 },
        { type: 'user', content: 'Sounds good! Do you also have child-friendly treatments?', delay: 5000 },
        { type: 'bot', content: 'Yes, we have specialists in pediatric dentistry. We do everything to make children feel safe and comfortable. We also have fluoride treatments and sealants. You can see all available times in the calendar above.', delay: 7000 },
        { type: 'user', content: 'Thanks! Can I also ask about any special offers?', delay: 5000 },
        { type: 'bot', content: 'Yes! We have student discount 20% on all treatments. We also have family packages with 15% discount. You can see all available times in the calendar above.', delay: 6000 }
      ],
      physio: isSwedish ? [
        { type: 'user', content: 'Hej! Jag behöver fysioterapi för min rygg', delay: 4000 },
        { type: 'bot', content: 'Hej! Välkommen till vår klinik. Jag kan hjälpa dig med fysioterapi. Låt mig kolla våra tillgängliga tider...', delay: 6000 },
        { type: 'booking', content: 'Bokningskalender', delay: 3000 },
        { type: 'user', content: 'Har du fått en remiss från din läkare?', delay: 5000 },
        { type: 'bot', content: 'Ja, det hjälper oss att anpassa behandlingen. En fysioterapibehandling kostar 650 kr. Vi tar emot remisser från alla sjukhus. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 },
        { type: 'user', content: 'Perfekt! Vad för behandlingar erbjuder ni?', delay: 5000 },
        { type: 'bot', content: 'Vi erbjuder manuell terapi, träningsterapi, massage och akupunktur. Vi har också specialister inom ryggvärk, sportskador och neurologisk rehabilitering. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 },
        { type: 'user', content: 'Låter bra! Hur lång tid tar en behandling?', delay: 5000 },
        { type: 'bot', content: 'En behandling tar cirka 45 minuter. Vi har också längre behandlingar på 60 minuter för mer komplexa problem. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 6000 },
        { type: 'user', content: 'Tack! Kan jag också fråga om ni har några specialerbjudanden?', delay: 5000 },
        { type: 'bot', content: 'Ja! Vi har pensionärsrabatt 25% på alla behandlingar. Vi har också paket med 10 behandlingar för 5500 kr istället för 6500 kr. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 }
      ] : [
        { type: 'user', content: 'Hi! I need physiotherapy for my back', delay: 4000 },
        { type: 'bot', content: 'Hi! Welcome to our clinic. I can help you with physiotherapy. Let me check our available times...', delay: 6000 },
        { type: 'booking', content: 'Booking Calendar', delay: 3000 },
        { type: 'user', content: 'Do you have a referral from your doctor?', delay: 5000 },
        { type: 'bot', content: 'Yes, that helps us adapt the treatment. A physiotherapy treatment costs 650 kr. We accept referrals from all hospitals. You can see all available times in the calendar above.', delay: 7000 },
        { type: 'user', content: 'Perfect! What treatments do you offer?', delay: 5000 },
        { type: 'bot', content: 'We offer manual therapy, exercise therapy, massage and acupuncture. We also have specialists in back pain, sports injuries and neurological rehabilitation. You can see all available times in the calendar above.', delay: 7000 },
        { type: 'user', content: 'Sounds good! How long does a treatment take?', delay: 5000 },
        { type: 'bot', content: 'A treatment takes about 45 minutes. We also have longer treatments of 60 minutes for more complex problems. You can see all available times in the calendar above.', delay: 6000 },
        { type: 'user', content: 'Thanks! Can I also ask about any special offers?', delay: 5000 },
        { type: 'bot', content: 'Yes! We have senior discount 25% on all treatments. We also have packages with 10 treatments for 5500 kr instead of 6500 kr. You can see all available times in the calendar above.', delay: 7000 }
      ],
      massage: isSwedish ? [
        { type: 'user', content: 'Hej! Jag vill boka en massage', delay: 4000 },
        { type: 'bot', content: 'Hej! Välkommen till vår massagesalong. Jag kan hjälpa dig med bokning av massage. Låt mig kolla våra tillgängliga tider...', delay: 6000 },
        { type: 'booking', content: 'Bokningskalender', delay: 3000 },
        { type: 'user', content: 'Vad för typer av massage erbjuder ni?', delay: 5000 },
        { type: 'bot', content: 'Vi erbjuder avslappnande massage för 750 kr, sportmassage för 850 kr, thaimassage för 800 kr och hot stone massage för 900 kr. Alla massager varar 60 minuter. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 },
        { type: 'user', content: 'Perfekt! Har ni också längre massager?', delay: 5000 },
        { type: 'bot', content: 'Ja, vi har 90-minuters massager för 1100 kr och 120-minuters massager för 1400 kr. Vi har också parmassage för 1500 kr. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 },
        { type: 'user', content: 'Låter bra! Har ni också andra behandlingar?', delay: 5000 },
        { type: 'bot', content: 'Ja, vi erbjuder ansiktsbehandlingar från 400 kr, manikyr/pedikyr från 300 kr och fotmassage för 350 kr. Vi har också paket med massage + ansiktsbehandling. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 },
        { type: 'user', content: 'Tack! Kan jag också fråga om ni har några specialerbjudanden?', delay: 5000 },
        { type: 'bot', content: 'Ja! Vi har studentrabatt 15% på alla massager. Vi har också en paketdeal: 5 massager för 3000 kr istället för 3750 kr. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 }
      ] : [
        { type: 'user', content: 'Hi! I want to book a massage', delay: 4000 },
        { type: 'bot', content: 'Hi! Welcome to our massage salon. I can help you book a massage. Let me check our available times...', delay: 6000 },
        { type: 'booking', content: 'Booking Calendar', delay: 3000 },
        { type: 'user', content: 'What types of massage do you offer?', delay: 5000 },
        { type: 'bot', content: 'We offer relaxing massage for 750 kr, sports massage for 850 kr, Thai massage for 800 kr and hot stone massage for 900 kr. All massages last 60 minutes. You can see all available times in the calendar above.', delay: 7000 },
        { type: 'user', content: 'Perfect! Do you also have longer massages?', delay: 5000 },
        { type: 'bot', content: 'Yes, we have 90-minute massages for 1100 kr and 120-minute massages for 1400 kr. We also have couple massage for 1500 kr. You can see all available times in the calendar above.', delay: 7000 },
        { type: 'user', content: 'Sounds good! Do you also have other treatments?', delay: 5000 },
        { type: 'bot', content: 'Yes, we offer facial treatments from 400 kr, manicure/pedicure from 300 kr and foot massage for 350 kr. We also have packages with massage + facial treatment. You can see all available times in the calendar above.', delay: 7000 },
        { type: 'user', content: 'Thanks! Can I also ask about any special offers?', delay: 5000 },
        { type: 'bot', content: 'Yes! We have student discount 15% on all massages. We also have a package deal: 5 massages for 3000 kr instead of 3750 kr. You can see all available times in the calendar above.', delay: 7000 }
      ],
      lawyer: isSwedish ? [
        { type: 'user', content: 'Hej! Jag behöver juridisk hjälp', delay: 4000 },
        { type: 'bot', content: 'Hej! Välkommen till vårt advokatbyrå. Jag kan hjälpa dig med juridisk rådgivning. Låt mig kolla våra tillgängliga tider...', delay: 6000 },
        { type: 'booking', content: 'Bokningskalender', delay: 3000 },
        { type: 'user', content: 'Jag har problem med min hyresvärd. Vad kan ni hjälpa mig med?', delay: 5000 },
        { type: 'bot', content: 'Vi har specialister inom hyresrätt som kan hjälpa dig med alla typer av hyreskonflikter. En första konsultation kostar 1200 kr. Vi har också gratis telefonrådgivning. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 },
        { type: 'user', content: 'Perfekt! Vad för andra områden specialiserar ni er på?', delay: 5000 },
        { type: 'bot', content: 'Vi specialiserar oss på familjerätt, företagsrätt, arbetsrätt och fastighetsrätt. Vi har också specialister inom skatterätt och brottmål. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 },
        { type: 'user', content: 'Låter bra! Hur fungerar betalningen?', delay: 5000 },
        { type: 'bot', content: 'Vi erbjuder både timpris och fasta priser beroende på ärendet. Vi har också rättshjälp för dem som kvalificerar sig. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 6000 },
        { type: 'user', content: 'Tack! Kan jag också fråga om ni har några specialerbjudanden?', delay: 5000 },
        { type: 'bot', content: 'Ja! Vi har studentrabatt 20% på alla konsultationer. Vi har också gratis första konsultation för pensionärer. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 }
      ] : [
        { type: 'user', content: 'Hi! I need legal help', delay: 4000 },
        { type: 'bot', content: 'Hi! Welcome to our law firm. I can help you with legal advice. Let me check our available times...', delay: 6000 },
        { type: 'booking', content: 'Booking Calendar', delay: 3000 },
        { type: 'user', content: 'I have problems with my landlord. What can you help me with?', delay: 5000 },
        { type: 'bot', content: 'We have specialists in rental law who can help you with all types of rental conflicts. A first consultation costs 1200 kr. We also have free phone consultation. You can see all available times in the calendar above.', delay: 7000 },
        { type: 'user', content: 'Perfect! What other areas do you specialize in?', delay: 5000 },
        { type: 'bot', content: 'We specialize in family law, corporate law, labor law and real estate law. We also have specialists in tax law and criminal law. You can see all available times in the calendar above.', delay: 7000 },
        { type: 'user', content: 'Sounds good! How does payment work?', delay: 5000 },
        { type: 'bot', content: 'We offer both hourly rates and fixed prices depending on the case. We also have legal aid for those who qualify. You can see all available times in the calendar above.', delay: 6000 },
        { type: 'user', content: 'Thanks! Can I also ask about any special offers?', delay: 5000 },
        { type: 'bot', content: 'Yes! We have student discount 20% on all consultations. We also have free first consultation for seniors. You can see all available times in the calendar above.', delay: 7000 }
      ],
      consultant: isSwedish ? [
        { type: 'user', content: 'Hej! Jag behöver konsulttjänster', delay: 4000 },
        { type: 'bot', content: 'Hej! Välkommen till vårt konsultföretag. Jag kan hjälpa dig med olika konsulttjänster. Låt mig kolla våra tillgängliga tider...', delay: 6000 },
        { type: 'booking', content: 'Bokningskalender', delay: 3000 },
        { type: 'user', content: 'Jag behöver hjälp med digital transformation. Vad kan ni erbjuda?', delay: 5000 },
        { type: 'bot', content: 'Vi har experter inom digital transformation som kan hjälpa dig med strategi, implementering och förändringsledning. En första konsultation kostar 2000 kr. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 },
        { type: 'user', content: 'Perfekt! Vad för andra områden specialiserar ni er på?', delay: 5000 },
        { type: 'bot', content: 'Vi specialiserar oss på strategi, IT-konsultation, ledarskap och försäljning. Vi har också specialister inom marknadsföring och HR. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 },
        { type: 'user', content: 'Låter bra! Hur fungerar konsultprocessen?', delay: 5000 },
        { type: 'bot', content: 'Vi börjar med en analys av dina behov, sedan utvecklar vi en strategi och hjälper dig implementera förändringarna. Vi följer upp resultaten. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 6000 },
        { type: 'user', content: 'Tack! Kan jag också fråga om ni har några specialerbjudanden?', delay: 5000 },
        { type: 'bot', content: 'Ja! Vi har startup-rabatt 30% för nya företag. Vi har också paket med 10 konsultationer för 15000 kr istället för 20000 kr. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 }
      ] : [
        { type: 'user', content: 'Hi! I need consulting services', delay: 4000 },
        { type: 'bot', content: 'Hi! Welcome to our consulting company. I can help you with various consulting services. Let me check our available times...', delay: 6000 },
        { type: 'booking', content: 'Booking Calendar', delay: 3000 },
        { type: 'user', content: 'I need help with digital transformation. What can you offer?', delay: 5000 },
        { type: 'bot', content: 'We have experts in digital transformation who can help you with strategy, implementation and change management. A first consultation costs 2000 kr. You can see all available times in the calendar above.', delay: 7000 },
        { type: 'user', content: 'Perfect! What other areas do you specialize in?', delay: 5000 },
        { type: 'bot', content: 'We specialize in strategy, IT consulting, leadership and sales. We also have specialists in marketing and HR. You can see all available times in the calendar above.', delay: 7000 },
        { type: 'user', content: 'Sounds good! How does the consulting process work?', delay: 5000 },
        { type: 'bot', content: 'We start with an analysis of your needs, then develop a strategy and help you implement the changes. We follow up on results. You can see all available times in the calendar above.', delay: 6000 },
        { type: 'user', content: 'Thanks! Can I also ask about any special offers?', delay: 5000 },
        { type: 'bot', content: 'Yes! We have startup discount 30% for new companies. We also have packages with 10 consultations for 15000 kr instead of 20000 kr. You can see all available times in the calendar above.', delay: 7000 }
      ],
      gym: isSwedish ? [
        { type: 'user', content: 'Hej! Jag vill bli medlem på gymmet', delay: 4000 },
        { type: 'bot', content: 'Hej! Välkommen till vårt gym. Jag kan hjälpa dig med medlemskap och träning. Låt mig kolla våra tillgängliga tider...', delay: 6000 },
        { type: 'booking', content: 'Bokningskalender', delay: 3000 },
        { type: 'user', content: 'Vad för medlemskap erbjuder ni?', delay: 5000 },
        { type: 'bot', content: 'Vi erbjuder månadsmedlemskap för 450 kr, årsmedlemskap för 4500 kr och studentmedlemskap för 350 kr. Alla medlemskap inkluderar tillgång till alla maskiner och gruppträning. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 },
        { type: 'user', content: 'Perfekt! Har ni också personlig tränare?', delay: 5000 },
        { type: 'bot', content: 'Ja, vi har certifierade personliga tränare. En session kostar 600 kr och inkluderar träningsplan och uppföljning. Vi har också gruppträning som yoga, spinning och styrketräning. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 },
        { type: 'user', content: 'Låter bra! Har ni också andra faciliteter?', delay: 5000 },
        { type: 'bot', content: 'Ja, vi har simhall, bastu, spa och café. Vi har också barnpassning under vissa timmar. Alla faciliteter ingår i medlemskapet. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 6000 },
        { type: 'user', content: 'Tack! Kan jag också fråga om ni har några specialerbjudanden?', delay: 5000 },
        { type: 'bot', content: 'Ja! Vi har introduktionserbjudande: 3 månader för 900 kr istället för 1350 kr. Vi har också familjemedlemskap med 20% rabatt. Du kan se alla tillgängliga tider i kalendern ovan.', delay: 7000 }
      ] : [
        { type: 'user', content: 'Hi! I want to become a gym member', delay: 4000 },
        { type: 'bot', content: 'Hi! Welcome to our gym. I can help you with membership and training. Let me check our available times...', delay: 6000 },
        { type: 'booking', content: 'Booking Calendar', delay: 3000 },
        { type: 'user', content: 'What memberships do you offer?', delay: 5000 },
        { type: 'bot', content: 'We offer monthly membership for 450 kr, annual membership for 4500 kr and student membership for 350 kr. All memberships include access to all machines and group training. You can see all available times in the calendar above.', delay: 7000 },
        { type: 'user', content: 'Perfect! Do you also have personal trainers?', delay: 5000 },
        { type: 'bot', content: 'Yes, we have certified personal trainers. A session costs 600 kr and includes training plan and follow-up. We also have group training like yoga, spinning and strength training. You can see all available times in the calendar above.', delay: 7000 },
        { type: 'user', content: 'Sounds good! Do you also have other facilities?', delay: 5000 },
        { type: 'bot', content: 'Yes, we have swimming pool, sauna, spa and café. We also have childcare during certain hours. All facilities are included in membership. You can see all available times in the calendar above.', delay: 6000 },
        { type: 'user', content: 'Thanks! Can I also ask about any special offers?', delay: 5000 },
        { type: 'bot', content: 'Yes! We have introductory offer: 3 months for 900 kr instead of 1350 kr. We also have family membership with 20% discount. You can see all available times in the calendar above.', delay: 7000 }
      ]
    };

    return steps[industry as keyof typeof steps] || steps.restaurant;
  };

  // Booking Calendar Component
  const BookingCalendar: React.FC<{ industry: string; language: string }> = ({ industry, language }) => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [isBookingComplete, setIsBookingComplete] = useState(false);

    const isSwedish = language === 'sv';
    
    // Generate current month calendar with Monday-Friday and dates 1-31
    const generateCalendarDays = () => {
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      
      const calendarDays = [];
      
      for (let day = 1; day <= Math.min(daysInMonth, 31); day++) {
        const date = new Date(currentYear, currentMonth, day);
        const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        // Only include Monday (1) through Friday (5)
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          const dateString = date.toISOString().split('T')[0];
          const isToday = day === today.getDate();
          const isPast = date < today;
          
          calendarDays.push({
            day,
            dayName: date.toLocaleDateString(isSwedish ? 'sv-SE' : 'en-US', { weekday: 'short' }),
            dateString,
            isToday,
            isPast
          });
        }
      }
      
      return calendarDays;
    };

    const calendarDays = generateCalendarDays();

    // Generate available times (industry specific)
    const getAvailableTimes = () => {
      if (industry === 'restaurant') {
        return ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
      } else if (industry === 'salon') {
        return ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];
      } else {
        return ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
      }
    };

    const availableTimes = getAvailableTimes();

    const handleDateSelect = (date: string) => {
      setSelectedDate(date);
      setSelectedTime('');
    };

    const handleTimeSelect = (time: string) => {
      setSelectedTime(time);
    };

    const handleBooking = () => {
      if (selectedDate && selectedTime) {
        setIsBookingComplete(true);
        // Here you would integrate with the actual booking system
        console.log(`Booking: ${industry} - ${selectedDate} at ${selectedTime}`);
      }
    };

    if (isBookingComplete) {
      return (
        <div className="text-center py-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Check className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm font-semibold text-emerald-800">
            {isSwedish ? 'Bokning bekräftad!' : 'Booking confirmed!'}
          </p>
          <p className="text-xs text-emerald-600 mt-1">
            {isSwedish ? 'Du får en bekräftelse via SMS' : 'You will receive confirmation via SMS'}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-3">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-800">
            {isSwedish ? 'Välj datum och tid' : 'Select date and time'}
          </span>
        </div>
        
        {/* Date Selection */}
        <div>
          <p className="text-xs font-medium text-slate-600 mb-2">
            {isSwedish ? 'Datum:' : 'Date:'}
          </p>
          <div className="grid grid-cols-5 gap-2">
            {calendarDays.map((dayInfo) => (
              <button
                key={dayInfo.dateString}
                onClick={() => handleDateSelect(dayInfo.dateString)}
                disabled={dayInfo.isPast}
                className={`p-2 rounded-lg text-xs border-2 transition-all ${
                  dayInfo.isPast
                    ? 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed'
                    : selectedDate === dayInfo.dateString
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : dayInfo.isToday
                    ? 'border-blue-300 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div className="font-semibold">{dayInfo.dayName}</div>
                <div className="text-lg font-bold">{dayInfo.day}</div>
                {dayInfo.isToday && (
                  <div className="text-xs text-blue-600 font-bold">IDAG</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div>
            <p className="text-xs font-medium text-slate-600 mb-2">
              {isSwedish ? 'Tid:' : 'Time:'}
            </p>
            <div className="grid grid-cols-5 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`p-2 rounded-lg text-xs border-2 transition-all ${
                    selectedTime === time
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <Clock className="w-3 h-3 inline mr-1" />
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Booking Button */}
        {selectedDate && selectedTime && (
          <button
            onClick={handleBooking}
            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all shadow-lg"
          >
            {isSwedish ? 'Bekräfta bokning' : 'Confirm booking'}
          </button>
        )}
      </div>
    );
  };

  const handleIndustrySelect = (industryKey: string) => {
    setSelectedIndustry(industryKey);
    setIsDropdownOpen(false);
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('boka') || lowerMessage.includes('book') || lowerMessage.includes('appointment')) {
      return currentLanguage.code === 'sv'
        ? 'Perfekt! Jag kan hjälpa dig med bokning. Låt mig kolla tillgängliga tider i vårt system...'
        : 'Perfect! I can help you with booking. Let me check available times in our system...';
    }
    
    if (lowerMessage.includes('pris') || lowerMessage.includes('price') || lowerMessage.includes('kostnad')) {
      return currentLanguage.code === 'sv'
        ? 'Jag kan ge dig information om våra priser. Vad specifikt vill du veta mer om?'
        : 'I can give you information about our prices. What specifically would you like to know more about?';
    }
    
    if (lowerMessage.includes('tid') || lowerMessage.includes('time') || lowerMessage.includes('schedule')) {
      return currentLanguage.code === 'sv'
        ? 'Jag kollar våra tillgängliga tider just nu. Ett ögonblick...'
        : 'I\'m checking our available times right now. One moment...';
    }
    
    if (lowerMessage.includes('hej') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
      return currentLanguage.code === 'sv'
        ? 'Hej igen! Hur kan jag hjälpa dig idag?'
        : 'Hi again! How can I help you today?';
    }
    
    return currentLanguage.code === 'sv'
      ? 'Tack för ditt meddelande! Jag förstår att du är intresserad av våra tjänster. Kan jag hjälpa dig med något specifikt?'
      : 'Thank you for your message! I understand you\'re interested in our services. Can I help you with something specific?';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `manual-user-${Date.now()}`,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: `manual-bot-${Date.now()}`,
        type: 'bot',
        content: generateBotResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-white via-slate-50 to-blue-50 rounded-3xl shadow-2xl border border-slate-200/50 mb-20 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {t('aiChatAgents.industryDemos.title')}
            </h3>
            <p className="text-lg opacity-90 mt-3 font-medium">{t('aiChatAgents.industryDemos.subtitle')}</p>
          </div>
          <div className="text-sm font-bold text-slate-900 bg-white/90 px-6 py-3 rounded-full shadow-lg">
            Live Demo
          </div>
        </div>
      </div>

      {/* Industry Selector */}
      <div className="p-8 bg-gradient-to-r from-slate-100 to-blue-100 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-full lg:w-96 bg-white border-2 border-slate-300 rounded-2xl px-6 py-4 text-left hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div>
                  <div className="text-sm text-slate-600 font-medium">{t('aiChatAgents.industryDemos.selectIndustry')}</div>
                  <div className="text-xl font-bold text-slate-900 mt-1">{currentDemo?.title}</div>
                  <div className="text-sm text-slate-600 mt-1">{currentDemo?.description}</div>
                </div>
                <ChevronDown className={`w-6 h-6 text-slate-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    className="absolute top-full left-0 right-0 mt-3 bg-white border-2 border-slate-300 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {demoOptions.map((demo) => (
                      <button
                        key={demo.key}
                        onClick={() => handleIndustrySelect(demo.key)}
                        className={`w-full text-left px-6 py-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 ${
                          selectedIndustry === demo.key ? 'bg-gradient-to-r from-blue-100 to-indigo-100 border-l-4 border-blue-500' : ''
                        }`}
                      >
                        <div className="font-bold text-lg text-slate-900">{demo.title}</div>
                        <div className="text-sm text-slate-600 mt-1">{demo.description}</div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Integration Info */}
            <div className="flex items-center space-x-6 text-sm text-slate-700">
              <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">Webhooks</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <Zap className="w-4 h-4 text-yellow-600" />
                <span className="font-semibold">API</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="font-semibold">MCP</span>
              </div>
            </div>
          </div>

          {/* Integration Note */}
          <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
            <p className="text-sm text-blue-800 font-medium">
              <strong>🔗 Integration:</strong> {t('aiChatAgents.industryDemos.integrationNote')}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="relative" style={{ height: '700px' }}>
        {/* Chat Header */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-slate-100 via-blue-100 to-indigo-100 p-6 border-b border-slate-200 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xl font-bold text-slate-900">Live Demo: {currentDemo?.conversation}</h4>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg" />
                  <span className="text-sm font-semibold text-slate-700">AUTOMATED - Intelligent AI</span>
                </div>
                <div className="w-px h-4 bg-slate-300"></div>
                <div className="text-sm font-semibold text-slate-900 bg-white px-4 py-1 rounded-full border border-slate-200 shadow-sm">
                  {currentLanguage.code === 'sv' ? 'Svensk Konversation' : 'Swedish Conversation'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Content */}
        <div className="pt-24 h-full bg-gradient-to-b from-white to-slate-50">
          <div className="h-full flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto chat-messages-container">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex items-start space-x-3 ${message.type === 'user' ? 'justify-end' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.type === 'bot' && (
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <div className={`rounded-2xl px-6 py-4 max-w-xs lg:max-w-md shadow-lg ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-slate-900 to-blue-900 text-white' 
                      : message.type === 'booking'
                      ? 'bg-gradient-to-r from-emerald-50 to-blue-50 border-2 border-emerald-200'
                      : 'bg-white border border-slate-200'
                  }`}>
                    {message.type === 'booking' ? (
                      <BookingCalendar industry={selectedIndustry} language={currentLanguage.code} />
                    ) : (
                      <>
                        <p className={`text-sm ${message.type === 'user' ? 'text-white' : 'text-slate-800'}`}>
                          {message.content}
                        </p>
                        <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-200' : 'text-slate-500'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="w-10 h-10 bg-gradient-to-r from-slate-900 to-blue-900 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-slate-200 bg-white">
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-slate-100 rounded-2xl px-6 py-4 border-2 border-slate-200 focus-within:border-blue-400 transition-colors duration-200">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={currentLanguage.code === 'sv' ? 'Skriv ditt meddelande...' : 'Type your message...'}
                    className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-500"
                    disabled={isTyping}
                  />
                </div>
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-slate-900 to-blue-900 text-white px-8 py-4 rounded-2xl font-semibold hover:from-slate-800 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>{currentLanguage.code === 'sv' ? 'Skicka' : 'Send'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IndustryDemos; 