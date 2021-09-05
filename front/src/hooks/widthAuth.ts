import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Api from "../services/api";

const widthAuth: GetServerSideProps = async ctx => {
	const { ["nextauth.token"]: token } = parseCookies(ctx);

	if (!token) {
		return {
			redirect: {
				destination: "/",
				permanent: false
			}
		};
	} else {
		try {
			await Api.post(
				"/user/validate",
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);
		} catch (err) {
			return {
				redirect: {
					destination: "/",
					permanent: false
				}
			};
		}

		return {
			props: ctx.query
		};
	}
};

export default widthAuth;
