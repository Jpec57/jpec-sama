export function getFlashcardReviewData() {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return hours.map((hour) => ({
    hour: hour.toString().padStart(2, "0") + ":00",
    cards: Math.floor(Math.random() * 20)
  }));
}
