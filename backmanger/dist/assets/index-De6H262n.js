import{a as B,u as ne,c as re,g as se,d as de}from"./index-BETLGyK2.js";import{I as M,b as ce,d as Z,r as x,c as r,o as d,k as g,w as t,f as l,h as c,e as O,B as q,F as A,u as o,g as y,K as ue,z as T,L as ie,_ as ee,j as pe,A as _e,t as I,l as U,q as me,E as Y,M as ge}from"./index-IDtxtGWq.js";const fe=()=>({isLast:M(()=>(m,u)=>m==u),addSubject:m=>{m.push({name:""})},deleteSubject:(m,u)=>{m.splice(u,1)}}),ve=()=>{let h=ce({gradeList:[{grade:B[0].value,subject:[{name:""}],_id:""}]});const j=()=>{h.gradeList=[{grade:B[0].value,subject:[{name:""}],_id:""}]},k=s=>{s.push({grade:null,subject:[{name:""}]})},m=(s,p)=>{s.splice(p,1)},u=M(()=>s=>s!=0),f=M(()=>(s,p)=>s==p);return{disableGrade:M(()=>h.gradeList.map(s=>s.grade).filter(s=>s)),formData:h,addGrade:k,deleteGrade:m,isFirstGrade:u,isLastGrade:f,resetForm:j}},be={class:"flex full"},ye={class:"button-group flex m-l"},ke={class:"flex"},we=Z({__name:"create",props:{modelValue:{type:Boolean,default:!1}},emits:["update:modelValue","on-submit"],setup(h,{expose:j,emit:k}){const m=h,u=x(),f=k,L=()=>{f("update:modelValue",!1)},s=()=>{f("on-submit")},{addSubject:p,deleteSubject:J,isLast:P}=fe(),{addGrade:R,deleteGrade:W,isFirstGrade:K,isLastGrade:H,formData:a,disableGrade:n,resetForm:S}=ve(),z=(_,V,b,e,w)=>{const C=e.subject.every(E=>E.name);e.grade&&C?b():b(new Error("请选择年级并且填写学科"))},v=()=>{var _;(_=u.value)==null||_.validate(V=>{if(V){const b=JSON.parse(JSON.stringify(a));b.gradeList.forEach(e=>{Reflect.deleteProperty(e,"_id")}),a.gradeList[0]._id?ne(a.gradeList[0]):re(b.gradeList),L(),s()}})};return j({reset:()=>{var _;(_=u.value)==null||_.resetFields(),S()},submit:v,refInjectGrade:_=>{a.gradeList[0]=_}}),(_,V)=>{const b=r("el-option"),e=r("el-select"),w=r("el-input"),C=r("el-button"),E=r("el-col"),X=r("el-row"),te=r("el-divider"),ae=r("el-form-item"),le=r("el-form"),oe=r("el-dialog");return d(),g(oe,{title:"学科",onClose:L,"model-value":m.modelValue},{footer:t(()=>[l(C,{type:"primary",onClick:v},{default:t(()=>[c("提交")]),_:1}),l(C,{onClick:L,type:"primary"},{default:t(()=>[c("取消")]),_:1})]),default:t(()=>[l(le,{ref_key:"formInstance",ref:u,model:o(a)},{default:t(()=>[(d(!0),O(A,null,q(o(a).gradeList,(G,F)=>(d(),g(ae,{rules:{required:!0,trigger:"change",validator:(i,N,D)=>z(i,N,D,G,F)},prop:`gradeList.${F}.grade`,label:"年级"},{default:t(()=>[l(e,{clearable:"",modelValue:G.grade,"onUpdate:modelValue":i=>G.grade=i},{default:t(()=>[(d(!0),O(A,null,q(o(B),i=>(d(),g(b,{disabled:o(n).includes(i.value),value:i.value,label:i.label},null,8,["disabled","value","label"]))),256))]),_:2},1032,["modelValue","onUpdate:modelValue"]),l(X,{class:"full m-t"},{default:t(()=>[(d(!0),O(A,null,q(G.subject,(i,N)=>(d(),g(E,null,{default:t(()=>[y("div",be,[l(w,{placeholder:"请输入学科例如(语文，数学，英语)",modelValue:i.name,"onUpdate:modelValue":D=>i.name=D},null,8,["modelValue","onUpdate:modelValue"]),y("div",ye,[o(P)(N,G.subject.length-1)?(d(),g(C,{key:0,icon:o(ue),type:"primary",onClick:D=>o(p)(G.subject)},null,8,["icon","onClick"])):T("",!0),N!=0?(d(),g(C,{key:1,icon:o(ie),type:"danger",onClick:D=>o(J)(G.subject,N)},null,8,["icon","onClick"])):T("",!0)])])]),_:2},1024))),256))]),_:2},1024),l(te),l(X,null,{default:t(()=>[l(E,null,{default:t(()=>[y("div",ke,[o(H)(F,o(a).gradeList.length-1)&&!o(a).gradeList[0]._id?(d(),g(C,{key:0,type:"primary",onClick:V[0]||(V[0]=i=>o(R)(o(a).gradeList))},{default:t(()=>[c("添加年级")]),_:1})):T("",!0),o(K)(F)?(d(),g(C,{key:1,type:"danger",onClick:i=>o(W)(o(a).gradeList,F)},{default:t(()=>[c("删除年级")]),_:2},1032,["onClick"])):T("",!0)])]),_:2},1024)]),_:2},1024)]),_:2},1032,["rules","prop"]))),256))]),_:1},8,["model"])]),_:1},8,["model-value"])}}}),Ce=ee(we,[["__scopeId","data-v-cd056e75"]]),he={class:"grade-header"},je={class:"grade-header-select"},Le={class:"grade-header-btn"},Ve={style:{"margin-top":"10px"}},Ge=Z({__name:"index",setup(h){const j=x(0),k=x(),u=_e().proxy.$timeFormat,f=x(!1),L=x([]),s=x(),p=async()=>{const a=await se({keyWord:k.value});a.data.data.forEach(n=>{n.showpopover=!1}),L.value=a.data.data,j.value=a.data.total||0},J=()=>{f.value=!0,me(()=>{var a;(a=s.value)==null||a.reset()})},P=async a=>{const n=await de({_id:a._id});a.showpopover=!1,n.code==200?(Y.success(n.message),p()):Y.error(n.message)},R=async a=>{var n;f.value=!0,(n=s.value)==null||n.refInjectGrade(ge(a))},W=a=>{U.pageNo=a,p()},K=()=>{p()},H=a=>{var n,S;return(S=(n=B)==null?void 0:n.find(z=>z.value===a))==null?void 0:S.label};return pe(()=>{p()}),(a,n)=>{const S=r("el-option"),z=r("el-select"),v=r("el-button"),$=r("el-table-column"),Q=r("el-popover"),_=r("el-table"),V=r("el-pagination"),b=r("el-card");return d(),g(b,{shadow:"never"},{default:t(()=>[y("div",he,[y("div",je,[l(z,{modelValue:k.value,"onUpdate:modelValue":n[0]||(n[0]=e=>k.value=e),clearable:"",placeholder:"请选择年级"},{default:t(()=>[(d(!0),O(A,null,q(o(B),e=>(d(),g(S,{key:e.value,label:e.label,value:e.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]),l(v,{type:"primary",onClick:K},{default:t(()=>[c("查询")]),_:1})]),y("div",Le,[l(v,{type:"primary",onClick:J},{default:t(()=>[c("新增")]),_:1})])]),l(_,{border:"",data:L.value},{default:t(()=>[l($,{align:"center",width:90,label:"年级",prop:"grade"},{default:t(e=>[c(I(H(e.row.grade)),1)]),_:1}),l($,{align:"center",width:180,label:"创建时间",prop:"createTime"},{default:t(e=>[c(I(o(u)(e.row.createTime)),1)]),_:1}),l($,{align:"center",width:180,label:"更新时间",prop:"updateTime"},{default:t(e=>[c(I(o(u)(e.row.updateTime)),1)]),_:1}),l($,{label:"科目"},{default:t(e=>[y("div",null,I(e.row.subject.map(w=>w.name).join(",")),1)]),_:1}),l($,{width:150,label:"操作"},{default:t(e=>[l(v,{onClick:w=>R(e.row),type:"primary",size:"small"},{default:t(()=>[c("编辑")]),_:2},1032,["onClick"]),l(Q,{visible:e.row.showpopover,trigger:"click",placement:"bottom",width:160},{reference:t(()=>[l(v,{onClick:w=>e.row.showpopover=!0,size:"small",type:"danger"},{default:t(()=>[c("删除")]),_:2},1032,["onClick"])]),default:t(()=>[y("p",null,"是否删除"+I(e.row.courseName),1),y("div",Ve,[l(v,{onClick:w=>e.row.showpopover=!1,type:"primary",size:"small"},{default:t(()=>[c("取消")]),_:2},1032,["onClick"]),l(v,{type:"danger",size:"small",onClick:w=>P(e.row)},{default:t(()=>[c(" 确定 ")]),_:2},1032,["onClick"])])]),_:2},1032,["visible"])]),_:1})]),_:1},8,["data"]),l(V,{onCurrentChange:W,"current-page":o(U).pageNo,"onUpdate:currentPage":n[1]||(n[1]=e=>o(U).pageNo=e),"page-size":o(U).pageSize,"onUpdate:pageSize":n[2]||(n[2]=e=>o(U).pageSize=e),background:"",layout:"prev, pager, next, jumper, ->, total",total:j.value},null,8,["current-page","page-size","total"]),l(Ce,{ref_key:"subjectDialog",ref:s,onOnSubmit:p,modelValue:f.value,"onUpdate:modelValue":n[3]||(n[3]=e=>f.value=e)},null,8,["modelValue"])]),_:1})}}}),xe=ee(Ge,[["__scopeId","data-v-bc700721"]]);export{xe as default};