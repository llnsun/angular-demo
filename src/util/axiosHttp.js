import axios from 'axios';
const instance = axios.create({
    baseURL: import.meta.env.DEV ? '/rest' : ''
});
instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response.status === 401) {
            document.dispatchEvent(new CustomEvent('auth-required'));
        }
        return Promise.reject(error);
    }
);
export const getBalance = async () => {
    const response = await instance.get('/query_balance');
    return response;
}
export const getMainCategory = async () => {
    return await instance.get('/query_main_category');
}
export const getTableList = async (params) => {
    const response = await instance.post('/query_table', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    });
    return response;
}
export const deleteTableData = async (params) => {
    const response = await instance.post('/delete', params);
    return response;
}
export const submitData = async (params) => {
    const response = await instance.post('/submit', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    });
    return response;
}
export const getChartdata = async (params) => {
    const response = await instance.post('/api/chartdata', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    });
    return response;
}
export const userlogin = async (params) => {
    const response = await instance.post('/login', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    });
    return response;
}