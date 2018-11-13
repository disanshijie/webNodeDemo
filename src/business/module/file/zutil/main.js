const StreamDownload=require("./download2");

// 定义回调函数
function downloadFileCallback(arg, percentage)
{
    if (arg === "progress")
    {
        // 显示进度
    }
    else if (arg === "finished")
    {
        // 通知完成
    }
}

// 调用下载
StreamDownload.downloadFile("http://mywebsite/update.7z", "./file", downloadFileCallback)
