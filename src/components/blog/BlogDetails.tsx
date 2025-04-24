import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogApi from "../../apis/blog/blog.api";
import { IBlog } from "../../apis/blog/blog.interface";
import { IApiResponse, IApiResponseTable, IApiTable } from "../../apis/interface";
import Preloader from "../../helper/Preloader";
import { useApi } from "../../hooks";

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
    }, [blogId]);

    return blogData ? (
        <section className="blog-details py-50">
            <div className="container container-lg">
                <div className="row gy-5">
                    <div className="col-lg-8 pe-xl-4">
                        <div className="blog-item-wrapper">
                            <div className="blog-item">
                                <div className="blog-item__content mt-24">
                                    <div className="flex-align flex-wrap gap-8">
                                        <span className="text-lg text-main-600">
                                            <i className="ph ph-calendar-dots" />
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            <div className="text-gray-500 hover-text-main-600">
                                                {dayjs(blogData.createdAt).format(
                                                    "HH:mm:ss DD/MM/YYYY"
                                                )}
                                            </div>
                                        </span>
                                    </div>
                                    <h4 className="mb-24">{blogData?.newsTitle}</h4>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: blogData.newsDetailContent,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="my-48">
                            <span className="border-bottom border-gray-100 d-block" />
                        </div>
                    </div>
                    <div className="col-lg-4 ps-xl-4">
                        {/* Recent Post Start */}
                        <div className="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40">
                            <h6 className="text-xl mb-32 pb-32 border-bottom border-gray-100">
                                Bài viết gần đây
                            </h6>
                            {blogTableData?.data.slice(0, 5).map((i) => (
                                <div
                                    key={i.newsId}
                                    className="d-flex align-items-center flex-sm-nowrap flex-wrap gap-24 mb-16"
                                >
                                    <Link
                                        to={`/blog-details/${i.newsId}`}
                                        className="w-100 h-100 rounded-4 overflow-hidden w-120 h-120 flex-shrink-0"
                                    >
                                        <img
                                            src={
                                                i.newsThumbnail ??
                                                "/assets/images/thumbs/recent-post1.png"
                                            }
                                            alt={i.newsThumbnail}
                                            className="cover-img"
                                        />
                                    </Link>
                                    <div className="flex-grow-1">
                                        <h6 className="text-lg">
                                            <Link
                                                to={`/blog-details/${i.newsId}`}
                                                className="text-line-3"
                                            >
                                                {i.newsTitle}
                                            </Link>
                                        </h6>
                                        <p className="text-gray-700 text-line-2">
                                            {i.newsShortContent}
                                        </p>
                                        <div className="flex-align flex-wrap gap-8">
                                            <span className="text-lg text-main-600">
                                                <i className="ph ph-calendar-dots" />
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                <div className="text-gray-500 hover-text-main-600">
                                                    {dayjs(i.createdAt).format(
                                                        "HH:mm:ss DD/MM/YYYY"
                                                    )}
                                                </div>
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
