import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogApi from "../../apis/blog/blog.api";
import { IBlog } from "../../apis/blog/blog.interface";
import { IApiResponse, IApiResponseTable, IApiTable } from "../../apis/interface";
import Preloader from "../../helper/Preloader";
import { useApi } from "../../hooks";
import "./BlogDetailsStyles.css";

const BlogDetails = ({ blogId }: { blogId: number }) => {
    const [blogData, setBlogData] = useState<IBlog>();
    const { request: getBlogDetail } = useApi(blogApi.getBlogDetail);

    const [blogTableData, setBlogTableData] = useState<IApiTable<IBlog>>();
    const { request: getBlogList } = useApi(blogApi.getBlogList);

    const getBlogListData = async () => {
        await getBlogList(undefined, (response) => {
            const { data } = response as IApiResponseTable<IBlog>;

            setBlogTableData(data);
        });
    };

    const getBlogData = async () => {
        await getBlogDetail(
            {
                params: {
                    newId: blogId,
                },
            },
            (response) => {
                const { data } = response as IApiResponse<IBlog>;

                setBlogData(data);
            }
        );
    };

    useEffect(() => {
        getBlogData();
        getBlogListData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blogId]);

    return blogData ? (
        <section className="blog-details">
            <div className="container container-lg">
                <div className="row gy-5">
                    <div className="col-lg-8 pe-xl-4">
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
                    </div>
                    <div className="col-lg-4 ps-xl-4">
                        {/* Recent Post Start */}
                        <div className="blog-sidebar">
                            <h3 className="sidebar-title">Recent Posts</h3>
                            {blogTableData?.data.slice(0, 5).map((post, index) => (
                                <div className="recent-post" key={post.newsId || index}>
                                    <div className="recent-post-image">
                                        <Link to={`/blog-details/${post.newsId}`}>
                                            <img
                                                src={
                                                    post.newsThumbnail ??
                                                    "/assets/images/thumbs/recent-post1.png"
                                                }
                                                alt={post.newsTitle || "Recent post thumbnail"}
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
                                        <p className="recent-post-description">
                                            {post.newsShortContent}
                                        </p>
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
                            ))}
                        </div>
                        {/* Recent Post End */}
                    </div>
                </div>
            </div>
        </section>
    ) : (
        <Preloader />
    );
};

export default BlogDetails;
