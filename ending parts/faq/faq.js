// Accordion FAQ Logic
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;

    // Close all other open answers
    document.querySelectorAll(".faq-answer").forEach((faq) => {
      if (faq !== answer) {
        faq.style.maxHeight = null;
        faq.style.padding = "0 15px";
      }
    });

    // Toggle current answer
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
      answer.style.padding = "0 15px";
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.padding = "15px";
    }
  });
});
