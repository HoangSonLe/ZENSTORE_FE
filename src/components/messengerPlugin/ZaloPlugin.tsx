import { useEffect } from "react";

const ZaloPlugin = () => {
    useEffect(() => {
        // Load Zalo SDK script
        const script = document.createElement("script");
        script.src = "https://sp.zalo.me/plugins/sdk.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            if ((window as any).Zalo) {
                (window as any).Zalo.CustomerChat.init({
                    zaloId: "", // Replace with your Zalo page ID
                });
            }
        };

        return () => {
            // Cleanup script on component unmount
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            {/* Placeholder for Zalo Chat Plugin */}
            <div id="zalo-chat-container"></div>
        </div>
    );
};

export default ZaloPlugin;
