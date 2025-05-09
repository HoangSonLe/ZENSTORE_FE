import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogApi from "../../apis/blog/blog.api";
import { IBlog } from "../../apis/blog/blog.interface";
import { IApiResponse, IApiResponseTable, IApiTable } from "../../apis/interface";
import { useApi } from "../../hooks";
import "./BlogDetailsStyles.css";

const BlogDetails = ({ blogId }: { blogId: number }) => {
    const [blogData, setBlogData] = useState<IBlog>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { request: getBlogDetail, loading: blogDetailLoading } = useApi(blogApi.getBlogDetail);

    const [blogTableData, setBlogTableData] = useState<IApiTable<IBlog>>();
    const { request: getBlogList, loading: blogListLoading } = useApi(blogApi.getBlogList);

    const getBlogListData = async () => {
        await getBlogList(undefined, (response) => {
            const { data } = response as IApiResponseTable<IBlog>;
            setBlogTableData(data);
        });
    };

    const getBlogData = async () => {
        setIsLoading(true);
        await getBlogDetail(
            {
                params: {
                    newId: blogId,
                },
            },
            (response) => {
                const { data } = response as IApiResponse<IBlog>;
                setBlogData(data);
                setIsLoading(false);
            }
        );
    };

    useEffect(() => {
        getBlogData();
        getBlogListData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blogId]);

    // Update loading state when either API call is loading
    useEffect(() => {
        setIsLoading(blogDetailLoading || blogListLoading);
    }, [blogDetailLoading, blogListLoading]);

    return (
        <section className="blog-details">
            <div className="container container-lg">
                <div className="row gy-5">
                    <div className="col-lg-8 pe-xl-4">
                        {!isLoading && blogData ? (
                            <>
                                <div className="blog-item-wrapper">
                                    <div className="blog-item">
                                        <div className="blog-item__content">
                                            <div className="blog-meta">
                                                <span className="blog-meta-icon">
                                                    <i className="ph ph-calendar-dots" />
                                                </span>
                                                <span className="blog-meta-text">
                                                    {dayjs(blogData.createdAt).format(
                                                        "HH:mm:ss DD/MM/YYYY"
                                                    )}
                                                </span>
                                            </div>
                                            <h1 className="blog-title">{blogData?.newsTitle}</h1>
                                            <div
                                                className="blog-content"
                                                dangerouslySetInnerHTML={{
                                                    __html: blogData.newsDetailContent,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="blog-divider"></div>
                            </>
                        ) : (
                            <div className="blog-loading-skeleton">
                                <div className="blog-item-wrapper">
                                    <div className="blog-item">
                                        <div className="blog-item__content">
                                            <div className="blog-meta skeleton-loading">
                                                <div className="skeleton-circle"></div>
                                                <div className="skeleton-text-sm"></div>
                                            </div>
                                            <div className="skeleton-title"></div>
                                            <div className="skeleton-content">
                                                <div className="skeleton-text"></div>
                                                <div className="skeleton-text"></div>
                                                <div className="skeleton-text"></div>
                                                <div className="skeleton-text"></div>
                                                <div
                                                    className="skeleton-text"
                                                    style={{ width: "75%" }}
                                                ></div>
                                            </div>
                                            <div className="skeleton-content mt-4">
                                                <div className="skeleton-text"></div>
                                                <div className="skeleton-text"></div>
                                                <div className="skeleton-text"></div>
                                                <div
                                                    className="skeleton-text"
                                                    style={{ width: "60%" }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="col-lg-4 ps-xl-4">
                        {/* Recent Post Start */}
                        <div className="blog-sidebar">
                            <h3 className="sidebar-title">Bài viết gần đây</h3>
                            {!isLoading && blogTableData?.data ? (
                                blogTableData.data
                                    .filter((item) => item.newsId !== blogId)
                                    .slice(0, 5)
                                    .map((post, index) => (
                                        <div className="recent-post" key={post.newsId || index}>
                                            <div className="recent-post-image">
                                                <Link to={`/blog-details/${post.newsId}`}>
                                                    <img
                                                        src={
                                                            post.newsThumbnail ??
                                                            "/assets/images/thumbs/recent-post1.png"
                                                        }
                                                        alt={
                                                            post.newsTitle ||
                                                            "Recent post thumbnail"
                                                        }
                                                        loading="lazy"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="recent-post-content">
                                                <h4 className="recent-post-title">
                                                    <Link to={`/blog-details/${post.newsId}`}>
                                                        {post.newsTitle}
                                                    </Link>
                                                </h4>
                                                <div
                                                    className="recent-post-description"
                                                    dangerouslySetInnerHTML={{
                                                        __html: post.newsShortContent,
                                                    }}
                                                />
                                                <div className="recent-post-meta">
                                                    <span className="recent-post-meta-icon">
                                                        <i className="ph ph-calendar-dots" />
                                                    </span>
                                                    <span className="recent-post-meta-text">
                                                        {dayjs(post.createdAt).format(
                                                            "HH:mm:ss DD/MM/YYYY"
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <>
                                    {[1, 2, 3].map((item) => (
                                        <div
                                            className="recent-post skeleton-recent-post"
                                            key={item}
                                        >
                                            <div className="recent-post-image skeleton-image"></div>
                                            <div className="recent-post-content">
                                                <div className="skeleton-text-sm"></div>
                                                <div
                                                    className="skeleton-text-sm"
                                                    style={{ width: "75%" }}
                                                ></div>
                                                <div className="skeleton-meta">
                                                    <div className="skeleton-circle-sm"></div>
                                                    <div className="skeleton-text-xs"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                        {/* Recent Post End */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogDetails;
