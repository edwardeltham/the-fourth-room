/*
  THE FOURTH ROOM: EVENTS LIST
  ============================
  This is the only file you need to edit to add an event.

  How to add one (you can do this on github.com):
    1. Open this file on GitHub and click the pencil icon (Edit).
    2. Copy the example block below, paste it inside the [ ] brackets, and fill it in.
    3. Click "Commit changes". The website updates about 2 minutes later.

  The page works out by itself which events are upcoming and which are past, using the date.

  Fields:
    title        Name of the event (required)
    date         The day, written as "YYYY-MM-DD", for example "2026-11-15" (required)
    start, end   Times, for example "6:00 PM" and "8:00 PM" (optional)
    description  One or two sentences about it (required)
    price        For example "Free" or "₹500" (optional)
    host         Who's running it (optional)
    link         Where people sign up: a WhatsApp, Instagram or ticket link (optional)
    image        A photo. Upload it to the img/events/ folder and put its path here,
                 for example "img/events/origami-nov.jpg" (optional)

  Example to copy (keep the curly brackets and put a comma after the closing one):

    {
      title: "Origami afternoon",
      date: "2026-11-15",
      start: "4:00 PM",
      end: "6:00 PM",
      description: "Paper, patience and lots of folding. Good for kids and grown-ups together.",
      price: "₹300",
      host: "The Fourth Room",
      link: "https://wa.me/919840254762",
      image: "img/events/origami-nov.jpg"
    },
*/

window.FOURTH_ROOM_EVENTS = [

  {
    title: "Kadhaipoma: a listening circle for women",
    date: "2026-11-14",
    start: "4:00 PM",
    end: "7:00 PM",
    description: "A safe space to be heard, without being judged or fixed. A grounding practice, a poem and quiet reflective writing, pair sharing, a full listening circle, a body-based coping skill, gratitude sharing, a small gift and refreshments. No advice. No fixing. Just listening. Women only, limited seats.",
    price: "₹826 all inclusive",
    host: "Viruthi (Flourishing Families)",
    link: "https://wa.me/919840254762?text=Hi%2C%20I%27d%20like%20a%20seat%20at%20Kadhaipoma%20on%2014%20November",
    image: "img/events/kadhaipoma-14-nov-2026.jpg"
  },

];
