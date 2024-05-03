import { createAlert } from "../index"
import { AlertType } from "../interface";

/**
 * Shares a post using the Web Share API if supported by the browser.
 */
const sharePost = (): void => {
    // Check for Web Share api support
    if (navigator.share) {
        // Browser supports native share api
        navigator.share({
            text: 'Please read this great article: ',
            url: 'https://www.google.com/'
        }).then(() => {
            createAlert("Thanks for sharing!", AlertType.success);
            console.log('Thanks for sharing!');
        })
            .catch((err) => {
                console.error(err)
                createAlert("Error sharing: " + err, AlertType.danger)
            });
    } else {
    }
};

export default sharePost;