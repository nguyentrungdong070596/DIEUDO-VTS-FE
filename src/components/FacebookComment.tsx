// src/components/FacebookComments.tsx
import { useEffect } from "react";
import "../static/css/facebookComment.scss" // Tùy chỉnh CSS
interface FacebookCommentsProps {
    url: string;
    width?: string;
    numPosts?: number;
}

const FacebookComments = ({ url, width = "100%", numPosts = 5 }: FacebookCommentsProps) => {
    useEffect(() => {
        if ((window as any).FB) {
            (window as any).FB.XFBML.parse();
        }
    }, [url]);

    return (
        <div className="facebook-comments-wrapper">
            <h3 className="fb-title">💬 Bình luận</h3>
            <div
                className="fb-comments"
                data-href={url}
                data-width={width}
                data-numposts={numPosts}
            />
        </div>
    );
};

export default FacebookComments;
