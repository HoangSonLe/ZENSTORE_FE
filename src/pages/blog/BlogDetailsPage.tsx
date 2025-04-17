import BlogDetails from "../../components/blog/BlogDetails";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
const BlogDetailsPage = () => {
    return (
        <>
            {/* Breadcrumb */}
            <Breadcrumb title={"Chi tiết tin tức"} />

            {/* BlogDetails */}
            <BlogDetails />
        </>
    );
};

export default BlogDetailsPage;
