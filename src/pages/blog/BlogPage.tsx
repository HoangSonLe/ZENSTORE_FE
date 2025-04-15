import Blog from "../../components/blog/Blog";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

const BlogPage = () => {
    return (
        <>
            {/* Breadcrumb */}
            <Breadcrumb title={"Blog"} />

            {/* Blog */}
            <Blog />
        </>
    );
};

export default BlogPage;
