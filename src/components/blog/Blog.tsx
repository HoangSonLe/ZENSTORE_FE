import { Link } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks";
import blogApi from "../../apis/blog/blog.api";
import { IApiResponseTable, IApiTable } from "../../apis/interface";
import { IBlog, IBlogQuery } from "../../apis/blog/blog.interface";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import "./BlogStyles.css";

const Blog = () => {
    const { setValue, getValues } = useForm<IBlogQuery>({
        defaultValues: {
            pageNumber: 1,
            pageSize: 10,
        },
    });

    const [blogTableData, setBlogTableData] = useState<IApiTable<IBlog>>();
    const { request: getBlogList } = useApi(blogApi.getBlogList);

    const getBlogData = async () => {
        const formValues = getValues();
        await getBlogList(
            {
                params: {
                    ...formValues,
                },
            },
            (response) => {
                const { data } = response as IApiResponseTable<IBlog>;

                setBlogTableData(data);
            }
        );
    };
    useEffect(() => {
        getBlogData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onPageChange = (page: number) => {
        setValue("pageNumber", page);
        getBlogData();
    };

    return (
        <section className="blog">
            <div className="container container-lg">
                <div className="row gy-5">
                    <div className="col-lg-8 pe-xl-4">
                        <div className="blog-item-wrapper">
                            {blogTableData && blogTableData.data?.length > 0 ? (
                                blogTableData.data.map((blog, index) => (
                                    <div className="blog-item" key={blog.newsId || index}>
                                        <div className="blog-image">
                                            <Link to={`/blog-details/${blog.newsId}`}>
                                                <img
                                                    src={
                                                        blog.newsThumbnail ??
                                                        "/assets/images/thumbs/recent-post1.png"
                                                    }
                                                    alt={blog.newsTitle || "Blog thumbnail"}
                                                    loading="lazy"
                                                />
                                            </Link>
                                        </div>
                                        <div className="blog-content">
                                            <h3 className="blog-title">
                                                <Link to={`/blog-details/${blog.newsId}`}>
                                                    {blog.newsTitle}
                                                </Link>
                                            </h3>
                                            <div
                                                className="blog-description"
                                                dangerouslySetInnerHTML={{
                                                    __html: blog.newsShortContent,
                                                }}
                                            />
                                            <div className="blog-meta">
                                                <span className="blog-meta-icon">
                                                    <i className="ph ph-calendar-dots" />
                                                </span>
                                                <span className="blog-meta-text">
                                                    {dayjs(blog.createdAt).format(
                                                        "HH:mm:ss DD/MM/YYYY"
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="blog-empty">
                                    <p className="blog-empty-text">Không có bài viết nào</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog;
