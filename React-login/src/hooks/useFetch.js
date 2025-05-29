import { useState,useEffect,useCallback } from "react";

const useFetch =(url,option = {})=>{
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    const getMockData = useCallback(()=>{
        if(url.includes('/api/dashboard/stats')){
            return{
                totalUsers: 1250,
          activeUsers: 870,
          newUsersToday: 24,
          totalRevenue: 189320,
            }
        }
        else if(url.includes('/api/users')){
            return [
                { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active' },
          { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'inactive' },
          { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'User', status: 'active' },
          { id: 5, name: 'Robert Brown', email: 'robert@example.com', role: 'Editor', status: 'active' },
        
            ]
        }
        return null;
    },[url]);

    const fetchData = useCallback(async ()=>{
        try{
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve,800));
            const mockData = getMockData();
            setData(mockData);
            setError(null);

        }
        catch(err){
            setError(err)
        }
        finally{
            setLoading(false);
        }
    },[url,options,getMockData]);

    useEffect(()=>{
        fetchData();

    },[fetchData]);

    return {data,loading,error,refetch:fetchData}


};

export default useFetch;