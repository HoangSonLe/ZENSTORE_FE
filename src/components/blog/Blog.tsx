import { Link } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks";
import blogApi from "../../apis/blog/blog.api";
import { IApiResponseTable, IApiTable } from "../../apis/interface";
import { IBlog, IBlogQuery } from "../../apis/blog/blog.interface";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

const Blog = () => {
    const { register, handleSubmit, watch, setValue, getValues, control } = useForm<IBlogQuery>({
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
    }, []);

    const onPageChange = (page: number) => {
        setValue("pageNumber", page);
        getBlogData();
    };

    return (
        <section className="blog py-60">
            <div className="container container-lg">
                <div className="row gy-5">
                    <div className="col-lg-8 pe-xl-4">
                        <div className="blog-item-wrapper">
                            {blogTableData && blogTableData.data?.length > 0 ? (
                                blogTableData.data.map((i) => (
                                    <div className="d-flex align-items-center flex-sm-nowrap flex-wrap gap-24 mb-16 p-16 rounded-3 border border-gray-100">
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
                                ))
                            ) : (
                                <label className="form-check-label">Không có bài viết nào</label>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog;
