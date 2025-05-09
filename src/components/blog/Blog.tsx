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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { request: getBlogList, loading: blogListLoading } = useApi(blogApi.getBlogList);

    const getBlogData = async () => {
        setIsLoading(true);
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
                setIsLoading(false);
            }
        );
    };

    useEffect(() => {
        getBlogData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update loading state when API is loading
    useEffect(() => {
        setIsLoading(blogListLoading);
    }, [blogListLoading]);

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
                            {isLoading ? (
                                // Skeleton loading UI
                                <>
                                    {[1, 2, 3].map((item) => (
                                        <div className="blog-item blog-skeleton" key={item}>
                                            <div className="blog-image skeleton-blog-image"></div>
                                            <div className="blog-content">
                                                <div className="skeleton-title"></div>
                                                <div className="skeleton-content">
                                                    <div className="skeleton-text"></div>
                                                    <div className="skeleton-text"></div>
                                                    <div
                                                        className="skeleton-text"
                                                        style={{ width: "75%" }}
                                                    ></div>
                                                </div>
                                                <div className="blog-meta skeleton-loading">
                                                    <div className="skeleton-circle"></div>
                                                    <div className="skeleton-text-sm"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : blogTableData && blogTableData.data?.length > 0 ? (
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
