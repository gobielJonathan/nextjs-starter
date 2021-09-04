import { KEY } from 'constant/key';
import isUndefined from 'lodash-es/isUndefined';
import nookies from 'nookies'
import routes from 'routes';

export default function useGuestMiddleware(ctx, access_callback) {
    const cookies = nookies.get(ctx)
    if (!isUndefined(cookies[KEY.TOKEN])) {
        return {
            redirect: {
                destination: routes.LOGOUT,
                permanent: false,
            },
        };
    }
    return access_callback()
}