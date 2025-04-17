// Countdown Timer Function
function countdown(targetDate: Date) {
    const now = new Date().getTime(); // Get current time in milliseconds
    const timeLeft = targetDate.getTime() - now; // Calculate time difference

    if (timeLeft > 0) {
        // Calculate time components
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Return countdown values
        return { days, hours, minutes, seconds };
    } else {
        // If countdown ends, return zeroes
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
}

const checkAndSetTargetDate = () => {
    // Try to get the target date from localStorage
    const storedTargetDate = localStorage.getItem('targetDate');

    // If there's a stored target date, parse it as a Date object
    let targetDate = storedTargetDate ? new Date(storedTargetDate) : null;

    // If stored target date doesn't exist or is expired, calculate a new target date
    if (!targetDate || targetDate < new Date()) {
        // Get the current date and add 7 days
        const currentDate = new Date();
        targetDate = new Date(currentDate);
        targetDate.setDate(currentDate.getDate() + 7);

        // Save the new target date in localStorage
        localStorage.setItem('targetDate', targetDate.toISOString());
    }

    console.log('Target Date:', targetDate);
    return targetDate;
};

const targetDate = checkAndSetTargetDate();
// Export the function to get the current countdown
export function getCountdown(customTargetDate?: Date) {
    return countdown(customTargetDate ?? targetDate);
}
