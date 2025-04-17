import Blog from "../../components/blog/Blog";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

const BlogPage = () => {
    return (
        <>
            {/* Breadcrumb */}
            <Breadcrumb title={"Tin tức"} />

            {/* Blog */}
            <Blog />
        </>
    );
};

export default BlogPage;
