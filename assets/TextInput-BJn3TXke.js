import{j as e,e as m}from"./index-DEe-8F7z.js";const y=({children:a,type:s="button",onClick:i,disabled:o=!1,isLoading:n=!1,variant:r="primary",size:d="md",fullWidth:c=!1,className:u="",...t})=>{const l="inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out",x={primary:"bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white",secondary:"bg-gray-200 hover:bg-gray-300 focus:ring-gray-500 text-gray-800",danger:"bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white",success:"bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white"},g={sm:"px-3 py-1.5 text-xs",md:"px-4 py-2 text-sm",lg:"px-6 py-3 text-base"},b=`
    ${l}
    ${x[r]}
    ${g[d]}
    ${c?"w-full":""}
    ${o||n?"opacity-60 cursor-not-allowed":""}
    ${u}
    `;return e.jsx("button",{type:s,onClick:i,disabled:o||n,className:b,...t,children:n?e.jsxs(e.Fragment,{children:[e.jsx(m,{size:"sm"}),e.jsx("span",{className:"ml-2",children:a})]}):a})},p=({id:a,name:s,type:i="text",label:o,placeholder:n,error:r,register:d,className:c="",...u})=>{const t=a||s;return e.jsxs("div",{className:`relative ${c}`,children:[o&&e.jsx("label",{htmlFor:t,className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",children:o}),e.jsx("input",{id:t,type:i,placeholder:n,"aria-describedby":r?`${t}-error`:void 0,...d&&s?d(s):{},className:`
          block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400
          focus:outline-none
          ${r?"border-red-300 focus:ring-red-500 focus:border-red-500":"border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}
          dark:bg-gray-800 dark:text-white
        `,...u}),r&&e.jsx("p",{id:`${t}-error`,className:"mt-1 text-sm text-red-600 dark:text-red-400",children:r})]})};export{y as B,p as T};
