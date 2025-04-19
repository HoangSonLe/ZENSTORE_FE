import { useParams } from "react-router-dom";
import BlogDetails from "../../components/blog/BlogDetails";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

const BlogDetailsPage = ({ blogId }: { blogId: number }) => {
    const { blogParamId } = useParams<{ blogParamId: string }>();
    return (
        <>
            {/* Breadcrumb */}
            <Breadcrumb title={"Chi tiết tin tức"} />

            {/* BlogDetails */}
            <BlogDetails blogId={blogId ?? blogParamId} />
        </>
    );
};

export default BlogDetailsPage;
