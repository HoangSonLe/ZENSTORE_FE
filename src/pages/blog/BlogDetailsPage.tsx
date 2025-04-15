import BlogDetails from "../../components/blog/BlogDetails";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
const BlogDetailsPage = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Blog Details"} />

      {/* BlogDetails */}
      <BlogDetails />
    </>
  );
};

export default BlogDetailsPage;
