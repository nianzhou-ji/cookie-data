import logo from './logo.svg';
import './App.css';
import {FiSave as SaveIcon} from "react-icons/fi";
import {SiCodereview as SearchIcon} from "react-icons/si";
import {IoList as DocumentsIcon} from "react-icons/io5";
import {FaFileExport as ExportIcon} from "react-icons/fa";
import {SiCookiecutter as TitleIcon} from "react-icons/si";
import {IoMdAddCircle as AddIcon} from "react-icons/io";
import {AiFillDelete as DeleteIcon} from "react-icons/ai";
import {IoCloseCircle as CloseIcon} from "react-icons/io5";
import {MdDraw as DrawICon} from "react-icons/md";
import {AiOutlineFileMarkdown as MarkDownIcon} from "react-icons/ai";
import {observer} from "mobx-react-lite";
import MarkdownComp from "./components/MarkdownComp/MarkdownComp";
import {LuDatabaseBackup as BackupIcon} from "react-icons/lu";
import {TbDatabaseImport as ImportBackupDataIcon} from "react-icons/tb";
import {useStore} from "./stores";
import indexedDBEngine from "./indexDBUtils/indexDBUtils";
import ModalContainerComp from "./components/ModalComp/ModalComp";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import _ from "lodash";
import ProcessComp from "./components/processComp/processComp";
import useMarkdownHooks from "./components/MarkdownComp/useMarkdownHooks";
import useAppHook from "./useAppHook";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Utils from "./utils";
import SearchComp from "./components/searchComp/searchComp";
import ToolboxComp from "./components/toolboxComp/toolboxComp";

function App() {
    const {commonStore} = useStore()


    const [appOpenCache, setAppOpenCache] = useState({})


    const {updateMarkdownData} = useMarkdownHooks()

    const buttonGroupID = ['AddIconID', 'DeleteIconID', 'MarkDownIconID', 'DrawIConID', 'DocumentsIconID',
        'SaveIconID', 'BackupIconID', 'ImportBackupDataIconID']


    const {initInterfaceData} = useAppHook()


    useEffect(() => {
        commonStore.initDocumentsGroup().then(async () => {
            await initInterfaceData()
        })


    }, []);


    useEffect(() => {
        if (commonStore.documentsGroup.length === 0) {
            buttonGroupID.forEach(item => {
                if (!['AddIconID', 'ImportBackupDataIconID'].includes(item)) {
                    Utils.setElementDisabled(item, true)
                }
            })
        } else {
            buttonGroupID.forEach(item => {
                Utils.setElementDisabled(item, false)
            })
        }


    }, [commonStore.documentsGroup])


    // document.addEventListener('keydown', async function (event) {
    //     if (event.ctrlKey && event.key === 's') {
    //         event.preventDefault(); // 阻止默认行为，即阻止浏览器执行保存操作
    //         // 在这里编写你的回调函数逻辑
    //         const res = commonStore.saveIndexedDB()
    //         if (res) {
    //             commonStore.setIsDocumentsGroupDataUpdate(false)
    //         } else {
    //             commonStore.setIsDocumentsGroupDataUpdate(true)
    //         }
    //     }
    // });


    document.addEventListener('paste', function (event) {
        // 获取粘贴板中的数据
        const items = (event.clipboardData || window.clipboardData).items;

        // 遍历粘贴板中的每个项目
        for (let i = 0; i < items.length; i++) {
            // 如果项目类型为图像
            if (items[i].type.indexOf('image') !== -1) {
                const file = items[i].getAsFile();

                // 使用FileReader读取文件内容
                const reader = new FileReader();
                reader.onload = function (event) {
                    // 此处的event.target.result就是图像的Base64编码
                    const base64String = event.target.result;
                };

                // 读取文件为Data URL
                reader.readAsDataURL(file);
            }
        }
    });


    const btnClass = ' btn btn-ghost btn-square btn-sm hover:scale-125 hover:shadow-xl focus:outline-none focus:ring active:bg-gray-500'


    return (
        <div id={'app'} className="flex flex-col p-2 h-screen ">
            <div style={{}} className="w-full flex  items-center justify-between mb-4">

                <div className='flex'>
                    <div className="flex items-center">
                        <TitleIcon size={'2rem'} className='ml-1'/>
                        <div className='font-bold '>Cookie Data</div>
                        <p className='ml-2 font-bold'>{commonStore.VERSION}</p>
                    </div>

                    {commonStore.toolboxAppOpenIconState ? <SearchComp/> : null}
                </div>


                <div className='flex'>
                    <div className={`font-bold mr-2 flex items-center ${commonStore.toolboxAppOpenIconState?null:'hidden'}`}>
                        {commonStore.getCurrentDocumentObj() === null ? "" : 'Document Title: ' + commonStore.getCurrentDocumentObj().name}
                    </div>
                    <div className="tooltip tooltip-left mr-2" data-tip="add document">
                        <ModalContainerComp>
                            <dialog id="addDocument_modal" className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Title</h3>
                                    <input type="text" placeholder="Type here"
                                           className="mt-2 input input-bordered" style={{width: '100%'}}
                                           value={commonStore.addDocumentName}
                                           onChange={e => commonStore.updateAddDocumentName(e.target.value)}/>
                                    <div className="modal-action">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn" onClick={() => {
                                                const id = crypto.randomUUID()
                                                const name = commonStore.addDocumentName
                                                const markdownData = {
                                                    "time": 1711019875915,
                                                    "blocks": [],
                                                    "version": "2.29.0"
                                                }
                                                const processData = {
                                                    "store": {
                                                        "document:document": {
                                                            "gridSize": 10,
                                                            "name": "",
                                                            "meta": {},
                                                            "id": "document:document",
                                                            "typeName": "document"
                                                        },
                                                        "page:page": {
                                                            "meta": {},
                                                            "id": "page:page",
                                                            "name": "Page 1",
                                                            "index": "a1",
                                                            "typeName": "page"
                                                        }
                                                    },
                                                    "schema": {
                                                        "schemaVersion": 1,
                                                        "storeVersion": 4,
                                                        "recordVersions": {
                                                            "asset": {
                                                                "version": 1,
                                                                "subTypeKey": "type",
                                                                "subTypeVersions": {
                                                                    "image": 3,
                                                                    "video": 3,
                                                                    "bookmark": 1
                                                                }
                                                            },
                                                            "camera": {"version": 1},
                                                            "document": {"version": 2},
                                                            "instance": {"version": 24},
                                                            "instance_page_state": {"version": 5},
                                                            "page": {"version": 1},
                                                            "shape": {
                                                                "version": 3,
                                                                "subTypeKey": "type",
                                                                "subTypeVersions": {
                                                                    "group": 0,
                                                                    "text": 1,
                                                                    "bookmark": 2,
                                                                    "draw": 1,
                                                                    "geo": 8,
                                                                    "note": 5,
                                                                    "line": 4,
                                                                    "frame": 0,
                                                                    "arrow": 3,
                                                                    "highlight": 0,
                                                                    "embed": 4,
                                                                    "image": 3,
                                                                    "video": 2
                                                                }
                                                            },
                                                            "instance_presence": {"version": 5},
                                                            "pointer": {"version": 1}
                                                        }
                                                    }
                                                }
                                                commonStore.addDocumentsGroup({
                                                    id, name, markdownData, processData
                                                })
                                                commonStore.updateCurrentDocumentID(id)

                                                updateMarkdownData(markdownData)

                                                commonStore.processDrawObj.store.loadSnapshot(processData)

                                                commonStore.updateAppCompOpenConfig({
                                                    markdownAppOpen: true,
                                                    processAppOpen: false,
                                                    errorPageAppOpen: false,
                                                    toolboxAppOpen: false,
                                                })


                                            }}>Confirm
                                            </button>

                                            <button className="btn ml-2">Close
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </ModalContainerComp>

                        <AddIcon size={'1.5rem'} className={btnClass + 'cursor-pointer'}
                                 onClick={() => {
                                     commonStore.updateAddDocumentName(Utils.formatTime(new Date()))
                                     document.getElementById('addDocument_modal').showModal()
                                 }} id={'AddIconID'}/>
                    </div>
                    <div className="tooltip tooltip-left mr-2" data-tip="delete document">
                        <DeleteIcon id={'DeleteIconID'} size={'1.5rem'}
                                    className={btnClass + 'cursor-pointer'} onClick={async () => {
                            commonStore.deleteDocumentsGroup(commonStore.currentDocumentID)
                            const res = await commonStore.saveIndexedDB()

                            if (res.state) {
                                await Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "delete saved",
                                    showConfirmButton: false,
                                    timer: 1500
                                });


                                if (commonStore.documentsGroup.length === 0) {
                                    commonStore.updateAppCompOpenConfig({
                                        markdownAppOpen: false,
                                        processAppOpen: false,
                                        errorPageAppOpen: true,
                                        toolboxAppOpen: false,
                                    })
                                    return
                                }

                                commonStore.updateCurrentDocumentID(commonStore.documentsGroup[commonStore.documentsGroup.length - 1].id)
                                await initInterfaceData()


                            } else {
                                await Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "delete failed"
                                });
                            }
                        }}/>
                    </div>

                    <div className="tooltip tooltip-left mr-2" data-tip="markdown">
                        <MarkDownIcon id={'MarkDownIconID'} size={'1.5rem'}
                                      className={btnClass + 'cursor-pointer'} onClick={async () => {
                            commonStore.updateAppCompOpenConfig({
                                markdownAppOpen: true,
                                processAppOpen: false,
                                errorPageAppOpen: false,
                                toolboxAppOpen: false,
                            })
                            await initInterfaceData()

                            commonStore.updateToolboxAppOpenIconState(true)
                        }}/>
                    </div>


                    <div className="tooltip tooltip-left mr-2" data-tip="process">
                        <DrawICon id={'DrawIConID'} size={'1.5rem'}
                                  className={btnClass + 'cursor-pointer'} onClick={async () => {
                            commonStore.updateAppCompOpenConfig({
                                markdownAppOpen: false,
                                processAppOpen: true,
                                errorPageAppOpen: false,
                                toolboxAppOpen: false,
                            })

                            await initInterfaceData()

                            commonStore.updateToolboxAppOpenIconState(true)
                        }}/>
                    </div>

                    <div className="tooltip tooltip-left mr-2" data-tip="view document list">
                        <DocumentsIcon id={'DocumentsIconID'} size={'1.5rem'}
                                       className={btnClass + 'cursor-pointer'} htmlFor="my-drawer-4"
                                       onClick={() => {
                                           document.getElementById('drawerID').click()
                                       }}/>

                        <ModalContainerComp>
                            <div className="drawer z-50">
                                <input id="my-drawer-4" type="checkbox" className="drawer-toggle"/>
                                <div className="drawer-content">
                                    {/* Page content here */}
                                    <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary hidden"
                                           id={'drawerID'}>Open drawer</label>
                                </div>
                                <div className="drawer-side">
                                    <label htmlFor="my-drawer-4" aria-label="close sidebar"
                                           className="drawer-overlay" onClick={(e) => {
                                    }}></label>
                                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                        {/* Sidebar content here */}
                                        {commonStore.documentsGroup.slice().reverse().map(item => <li key={item.id}
                                                                                                      className={`${item.id === commonStore.currentDocumentID ? 'bg-blue-100' : null}`}>
                                            <a
                                                onClick={async () => {
                                                    commonStore.updateCurrentDocumentID(item.id)
                                                    await initInterfaceData()
                                                }}>{item.name}</a>
                                        </li>)}

                                    </ul>
                                </div>
                            </div>
                        </ModalContainerComp>

                    </div>
                    <div className="tooltip tooltip-left mr-2" data-tip='save document'>
                        <SaveIcon id={'SaveIconID'} size={'1.5rem'}
                                  className={btnClass + 'cursor-pointer'}
                                  color={`${commonStore.isDocumentsGroupDataUpdate ? '#fa0404' : '#000'}`}
                                  onClick={async () => {
                                      const res = await commonStore.saveIndexedDB()
                                      if (res.state) {
                                          await Swal.fire({
                                              position: "top-end",
                                              icon: "success",
                                              title: "data save success",
                                              showConfirmButton: false,
                                              timer: 1500
                                          });
                                          commonStore.setIsDocumentsGroupDataUpdate(false)


                                      } else {
                                          await Swal.fire({
                                              icon: "error",
                                              title: "Oops...",
                                              text: "import failed:" + res.error
                                          });


                                      }
                                  }}/>
                    </div>


                    {/*<div className="tooltip tooltip-left  mr-2" data-tip='export current document'>*/}

                    {/*    <SearchIcon size={'1.5rem'} className='cursor-pointer' onClick={() => {*/}

                    {/*    }}/>*/}
                    {/*</div>*/}

                    {/*<div className="tooltip tooltip-left  mr-2" data-tip='export current document to local desktop'>*/}
                    {/*    <ExportIcon size={'1.5rem'} className='cursor-pointer' onClick={() => {*/}
                    {/*        commonStore.downloadMarkdown()*/}
                    {/*    }}/>*/}
                    {/*</div>*/}


                    <div className="tooltip tooltip-left  mr-2" data-tip='backup all documents to local desktop'>
                        <BackupIcon id={'BackupIconID'} size={'1.5rem'}
                                    className={btnClass + 'cursor-pointer'} onClick={() => {
                            commonStore.downloadAllData()
                        }}/>
                    </div>
                    <div className="tooltip tooltip-left   mr-2" data-tip='import backup documents'>
                        <ModalContainerComp>
                            <dialog id="ImportBackupData_modal" className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Import backup data</h3>
                                    <input id="fileInput" type="file"
                                           className="file-input file-input-bordered w-full mt-3" multiple
                                           accept=".json" onChange={async e => {

                                        const res = await commonStore.parsingBackupData(e.target.files)
                                        if (!res.state) {
                                            await Swal.fire({
                                                icon: "error",
                                                title: "Oops...",
                                                text: "import failed:" + res.error
                                            });

                                            return
                                        }

                                        if (commonStore.documentsGroup !== undefined && commonStore.documentsGroup.length > 0) {
                                            commonStore.updateCurrentDocumentID(commonStore.documentsGroup[0].id)
                                        }

                                        await initInterfaceData()


                                        commonStore.updateAppCompOpenConfig({
                                            markdownAppOpen: true,
                                            processAppOpen: false,
                                            errorPageAppOpen: false,
                                            toolboxAppOpen: false,
                                        })

                                        await Swal.fire({
                                            position: "top-end",
                                            icon: "success",
                                            title: "Import backup data success",
                                            showConfirmButton: false,
                                            timer: 1500
                                        });


                                    }}/>
                                    <div className="modal-action">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn">Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>

                        </ModalContainerComp>
                        <ImportBackupDataIcon id={'ImportBackupDataIconID'} size={'1.5rem'}
                                              className={btnClass + 'cursor-pointer'}
                                              onClick={() => {
                                                  document.getElementById('ImportBackupData_modal').showModal()
                                              }}/>
                    </div>


                    <div className="tooltip tooltip-left" data-tip='Open toolbox'>

                        <svg onClick={() => {

                            setAppOpenCache(_.cloneDeep(commonStore.appCompOpenConfig))


                            commonStore.updateAppCompOpenConfig({
                                markdownAppOpen: false,
                                processAppOpen: false,
                                errorPageAppOpen: false,
                                toolboxAppOpen: true,
                            })

                            commonStore.updateToolboxAppOpenIconState(false)


                            buttonGroupID.forEach(item => {
                                Utils.setElementDisabled(item, true)
                            })

                        }} t="1711625812241"
                             className={btnClass + 'cursor-pointer ' + `${commonStore.toolboxAppOpenIconState ? null : 'hidden'}`}
                             viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="8023" width="1.5rem" height="1.5rem">
                            <path
                                d="M608 768h-192v-96H64v192a128 128 0 0 0 128 128h640a128 128 0 0 0 128-128v-192H608z m176-512H768V179.84a141.76 141.76 0 0 0-128-141.44 1354.56 1354.56 0 0 0-258.56 0A141.76 141.76 0 0 0 256 179.84V256h-16A208 208 0 0 0 32 464V608h384v-96h192v96h384v-144A208 208 0 0 0 784 256zM640 256h-256V179.84a14.4 14.4 0 0 1 12.8-14.4 1226.24 1226.24 0 0 1 230.4 0 14.4 14.4 0 0 1 12.8 14.4z"
                                fill="#231F20" p-id="8024"></path>
                        </svg>

                    </div>


                    <div className="tooltip tooltip-left" data-tip='Close toolbox'>

                        <svg onClick={() => {
                            commonStore.updateAppCompOpenConfig(appOpenCache)

                            commonStore.updateToolboxAppOpenIconState(true)


                            buttonGroupID.forEach(item => {
                                Utils.setElementDisabled(item, false)
                            })
                        }}
                             t="1711627062940"
                             className={btnClass + 'cursor-pointer ' + `${!commonStore.toolboxAppOpenIconState ? null : 'hidden'}`}
                             viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="8994" width="1.5rem" height="1.5rem">
                            <path
                                d="M509.262713 5.474574c281.272162 0 509.262713 228.02238 509.262713 509.262713 0 281.272162-227.990551 509.262713-509.262713 509.262713s-509.262713-227.990551-509.262713-509.262713c0-281.240333 227.990551-509.262713 509.262713-509.262713z m135.050106 278.725849L509.262713 419.250528l-135.050106-135.050105-90.012184 90.012184L419.186871 509.262713l-135.018277 135.081935 90.012184 90.012184L509.262713 599.274897l135.050106 135.050106 90.012184-90.012184L599.274897 509.262713l135.050106-135.050106-90.012184-90.012184z"
                                fill="#4B4B4B" p-id="8995"></path>
                        </svg>

                    </div>


                </div>
            </div>
            <MarkdownComp/>
            <ProcessComp/>
            <ErrorPage/>
            <ToolboxComp/>
        </div>
    );
}

export default observer(App);
