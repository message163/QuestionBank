import{g as $,a as b}from"./index-BTrvZOqj.js";import{r as u,a as v,E as f,A as k}from"./index-bH1KA4aG.js";const S=()=>{const a=u([]),r=async()=>{const s=(await $({pageNo:1,pageSize:b.length})).data.data;s.forEach(l=>{l.subject.forEach(d=>{d.id=`${l._id}-${d.name}`})}),a.value=s},c=o=>{var s;return(s=b.find(l=>l.value===o.grade))==null?void 0:s.label};return r(),{list:a,getLabel:c}},j=async a=>(await v.post("/api/knowledge/create",a)).data,C=async a=>(await v.get(`/api/knowledge/list/${a.subjectId}`,{params:a})).data,E=async a=>(await v.patch(`/api/knowledge/update/${a.subjectId}`,a)).data,M=()=>{const a=k(),r=u(""),c=u(!1);let o=u(-1/0);const s=u([]),l=()=>{o.value=-1/0;const t=e=>{for(const n of e)n.id>o.value&&(o.value=n.id),n.children&&t(n.children)};t(s.value)},d=(t,{node:e,data:n,store:i})=>t("span",{class:"custom-tree-node"},[t("span",null,e.label),t("span",null,[t("a",{style:{"margin-right":"8px",color:"#67c23a"},onClick:()=>m(n)},"修改名称"),t("a",{style:{color:"#409eff"},onClick:()=>p(n)},"添加知识点 "),t("a",{style:{"margin-left":"8px",color:"#f56c6c"},onClick:()=>w(e,n)},"删除知识点")])]),p=async t=>{var i;const e=await((i=a==null?void 0:a.proxy)==null?void 0:i.$prompt("请输入知识点名称","添加知识点",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/\S/,inputErrorMessage:"知识点名称不能为空"}));if(!(e!=null&&e.value))return;const n={id:o.value+1,label:e.value,children:[]};t.children||(t.children=[]),t.children.push(n),s.value=[...s.value],l()},m=async t=>{var n;const e=await((n=a==null?void 0:a.proxy)==null?void 0:n.$prompt("请输入知识点名称","修改知识点",{confirmButtonText:"确定",cancelButtonText:"取消",inputValue:t.label,inputPattern:/\S/,inputErrorMessage:"知识点名称不能为空"}));t.label=e.value},w=(t,e)=>{var y;if(e.id===1){(y=a==null?void 0:a.proxy)==null||y.$message.error("根知识点不能删除");return}const n=t.parent,i=n.data.children||n.data,I=i.findIndex(T=>T.id===e.id);i.splice(I,1),l()},x=async()=>{if(!r.value)return f.error("请选择科目");const t={subjectId:r.value,gradeId:r.value.split("-")[0],gradeName:r.value.split("-")[1],TreeKnowledge:s.value},e=await(c.value?E(t):j(t));(e==null?void 0:e.code)==200?(f.success(e.message),g(r.value)):f.error((e==null?void 0:e.message)||"提交失败")},h=()=>{g(r.value)},g=async t=>{if(t){const e=await C({subjectId:t});e.data?(s.value=e.data.TreeKnowledge,c.value=!0):(s.value=[{id:1,label:"知识点",children:[]}],c.value=!1),l()}else s.value=[],c.value=!1};return{renderContent:d,append:p,edit:m,remove:w,submit:x,changeSubject:h,getTree:g,subjectId:r,dataSource:s,isData:c}};export{S as a,M as u};