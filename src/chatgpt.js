////////////////// 虎绿林 ChatGPT 聊天机器人 //////////////////

/**************************************************************
使用方法：
1. 使用最新版的Chrome谷歌浏览器或Firefox火狐浏览器，不要使用QQ浏览器、360浏览器等，不保证兼容。
2. 安装油猴插件：https://www.tampermonkey.net/
3. 在油猴里添加新脚本，粘贴如下代码并保存：

// ==UserScript==
// @name         虎绿林ChatGPT机器人
// @namespace    https://hu60.cn/
// @version      1.0
// @description  把ChatGPT接入hu60wap6网站程序
// @author       老虎会游泳
// @match        https://chat.openai.com/chat*
// @icon         https://hu60.cn/favicon.ico
// @grant        none
// ==/UserScript==

document.hu60AdminUids = [1, 19346, 15953]; // 机器人管理员uid，管理员可以发“@ChatGPT，刷新页面”来重启机器人
document.hu60Domain = 'https://hu60.cn';    // 如果要对接其他网站，请修改此处的域名（必须是https的否则连不上）
var script = document.createElement("script");
script.src = document.hu60Domain + '/tpl/jhin/js/chatgpt/chatgpt.js?r=' + (new Date().getTime());
document.head.appendChild(script);

4. 打开 https://chat.openai.com/ 并登录。
5. 在来到 https://chat.openai.com/chat 页面时，会弹出输入虎绿林用户名密码的提示框。
   如果你要把机器人接入虎绿林，请注册一个新帐号。**使用现有帐号运行机器人将被删帖或禁言**。
   输入新帐号用户名密码后，机器人即启动，保持页面不要关闭。
   机器人会使用你在此处输入的帐号与其他用户进行对话，在虎绿林用其他帐号`@该帐号`即可尝试对话。
   注意，使用该帐号自己`@自己`是不会有反应的，必须用另一个账号来和机器人对话。
6. 建议按F12打开开发者控制台（按F12，点“控制台”或“Console”），可以看到机器人的运行情况，而且好像能提升机器人运行的稳定性。
7. 如何切换登录的帐号？按F12打开开发者工具，点“控制台”或“Console”，然后输入以下代码并回车：
    login(true)
   将会重新弹出用户名密码输入框。

### 如何把机器人接入其他类型的网站？

你可以在油猴脚本的末尾添加一个自定义主循环，用于把机器人接入其他类型的网站。以下是一个例子：

document.run = async function() {
    while (true) {
        try {
            // 访问你的网站获取要发给ChatGPT的内容
            // 网站必须是https的，否则连不上。
            // 此外网站还必须设置 Access-Control-Allow-Origin: * 头信息，否则也连不上。
            let response = await fetch('https://example.com/my-message.php');

            // 假设获取到的信息是JSON，把它转换成JSON对象
            // 网站必须设置 content-type: application/json 头信息，否则转换会失败。
            let messages = response.json();

            // 假设JSON结构是这样：
            // {"data": [
            //    {"uid":3, "text":"@ChatGPT，你好"},
            //    {"uid":2, "text":"@ChatGPT，我有一个问题"},
            //    {"uid":1, "text":"@ChatGPT，刷新页面"},
            // ]}
            let exceptionCount = 0;
            for (let i=0; i<messages.data.length; i++) {
                // 要发给ChatGPT的话，开头包含的“@机器人名称，”会被后续流程自动去除。
                // 开头写“@机器人名称 2，”可以选择第二个ChatGPT模型（Legacy模型，仅限ChatGPT Plus用户）。
                let text = messages.data.text;

                // 用户id，可以是字符串，所以给出用户名也是可以的。
                let uid = messages.data.uid;

                try {
                    // 把对话发给ChatGPT
                    // 返回的 modelIndex 是为对话选择的模型id（从0开始编号）
                    // 模型id和序号的对应关系见 chatgpt.js 里的 modelMap 变量
                    let modelIndex = await sendRequest(text, uid);

                    // 从ChatGPT读取回复
                    let replyText = await readReply();

                    // 发送回复到你的网站
                    // 创建一个POST表单
                    let formData = new FormData();
                    formData.append('token', '用于用户身份验证的密钥');
                    formData.append('reply', replyText); // 回复内容

                    // 提交POST表单
                    // 网站必须是https的，否则连不上。
                    // 此外网站还必须设置 Access-Control-Allow-Origin: * 头信息，否则也连不上。
                    let response = await fetch('https://example.com/my-reply.php', {
                        body: formData,
                        method: "post",
                        redirect: "manual" // 不自动重定向
                    });

                    // 在控制台打印提交结果
                    if (response.type == 'opaqueredirect') {
                        console.log('提交后收到重定向（目标网址未知，根据标准，浏览器不告诉我们），不清楚提交是否成功');
                    } else {
                        let result = await response.text();
                        console.log('提交结果', result);
                    }

                    // 避免操作太快
                    await sleep(100);
                } catch (ex) {
                    exceptionCount++;  // 统计异常次数
                    console.error(ex); // 打印异常到控制台
                    await sleep(1000); // 异常后等久一点
                }

                // 重命名会话
                await renameWant();
            }

            // 执行管理员命令（比如“刷新页面”）
            await runAdminCommand();

            // 异常太多，自动刷新页面
            if (exceptionCount > 0 && exceptionCount >= messages.data.length) {
                location.reload();
            }

            // 限制拉取信息的速度，避免对自己的网站造成CC攻击
            await sleep(1000);
        } catch (ex) {
            console.error(ex);
            await sleep(1000);
        }
    }
}

**************************************************************/

// 与之前的启动方式保持兼容
if (typeof hu60Domain != 'undefined') {
    document.hu60Domain = hu60Domain;
}

// 虎绿林URL
const hu60Url = document.hu60Domain + '/q.php/';

// https://github.com/mixmark-io/turndown
// 老虎会游泳修改了 collapseWhitespace 函数以保留所有空白和换行
const turndownJsUrl = document.hu60Domain + '/tpl/jhin/js/chatgpt/turndown-tigermod.js';

// https://github.com/mixmark-io/turndown-plugin-gfm
const turndownGfmJsUrl = document.hu60Domain + '/tpl/jhin/js/chatgpt/turndown-plugin-gfm.js';

/////////////////////////////////////////////////////////////

// 已知机器人列表
const robotList = '\n\n已知机器人列表：\n* @[empty]ChatGPT\n* @[empty]罐子2号\n* @[empty]靓仔\n\n';

// 错误提示翻译
const errorMap = {
    'Too many requests in 1 hour. Try again later.':
        "当前机器人达到OpenAI设置的一小时对话次数上限，请过段时间再试，或尝试@[empty]其他机器人。" + robotList,

    'An error occurred. Either the engine you requested does not exist or there was another issue processing your request. If this issue persists please contact us through our help center at help.openai.com.':
        "ChatGPT接口报错（会话丢失），请稍后重试，或尝试@[empty]其他机器人。" + robotList,

    // the request ID 后面是一串随机值，所以没有粘贴过来。匹配时回复将截短到错误提示的最大长度，只要保证该错误提示是最长的，就不需要处理随机ID问题。
    'The server had an error while processing your request. Sorry about that! You can retry your request, or contact us through our help center at help.openai.com if the error persists. (Please include the request ID':
        "ChatGPT接口报错（服务器出错），请重试，或尝试@[empty]其他机器人。" + robotList,

    'An error occurred. If this issue persists please contact us through our help center at help.openai.com.':
        "ChatGPT接口报错（客户端错误），请重试，或尝试@[empty]其他机器人。" + robotList,

    'Only one message at a time. Please allow any other responses to complete before sending another message, or wait one minute.':
        "ChatGPT接口报错（并发受限），请稍后重试，或尝试@[empty]其他机器人。" + robotList,

    'Something went wrong':
        "ChatGPT接口报错（抛出异常），请稍后重试，或尝试@[empty]其他机器人。" + robotList,

    'network error':
        "ChatGPT接口报错（网络错误），请稍后重试，或尝试@[empty]其他机器人。" + robotList,

    'The message you submitted was too long, please reload the conversation and submit something shorter.':
        "内容超过ChatGPT长度限制，请缩短。当前会话已丢失。",
};

// 错误提示文本的最大长度
const errorMaxLen = Math.max(...Object.keys(errorMap).map(x => x.length));

// 模型对应关系（仅限 ChatGPT Plus 付费用户）
const modelMap = {
    1 : 0, // @ChatGPT 1，对应第一个Default模型
    2 : 1, // @ChatGPT 2，对应第二个Legacy模型
};

/////////////////////////////////////////////////////////////

// 聊天框的CSS选择器
const chatBoxSelector = 'textarea.w-full.p-0';

// 发送按钮的CSS选择器
const sendButtonSelector = 'button.absolute.p-1';

// 正在输入动效（三个点）和加载中动效（转圈）的CSS选择器
const replyNotReadySelector = 'div.text-2xl, .animate-spin';

// 聊天回答的CSS选择器
// div.markdown 是正常回复
// div.text-gray-600 是错误信息（比如网络错误）
const chatReplySelector = 'div.markdown, div.text-gray-600';

// 左侧会话列表项的CSS选择器
const sessionListItemSelector = 'a.relative.rounded-md';

// 当前会话的CSS选择器
const currentSessionSelector = 'a.relative.rounded-md.bg-gray-800';

// 编辑、删除、确认、取消按钮的CSS选择器
const actionButtonSelector = 'button.p-1.hover\\:text-white';

// 会话名称编辑框的CSS选择器
const sessionNameInputSelector = 'input.text-sm.w-full';

// 新建会话按钮的CSS选择器
const newChatButtonSelector = 'a.flex-shrink-0.border';

// 模型下拉框的CSS选择器
const modelListBoxSelector = 'button.w-full.cursor-default';

// 模型列表项的CSS选择器
const modelListItemSelector = 'li.select-none.items-center';

// “Upgrade to Plus”按钮的CSS选择器
const upgradeToPlusSelector = 'span.gold-new-button.flex';

// 会话列表“Show more”按钮的CSS选择器
const showMoreButtonSelector = 'button.justify-center.m-auto';

/////////////////////////////////////////////////////////////

// 用户自身的虎绿林uid（自动获取）
var hu60MyUid = null;

// 带sid的虎绿林URL（自动获取）
var hu60BaseUrl = null;

// 在切换会话前重命名当前会话
// 缓解重命名失败的方法
var wantRename = null;

// 回复结束时间
// 在回复结束10秒后重命名会话，
// 以防ChatGPT自动重命名会话导致我们的名称保存失败。
var replyFinishTime = 0;

// 管理员想要刷新页面
var wantRefresh = false;

// 新会话标识
var isNewSession = false;

// 空白发言标识
var isTextEmpty = false;

// 命令短语回复
var commandPhraseReply = null;

// 重试对话内容缓存
var retryChatTexts = {};

/////////////////////////////////////////////////////////////

// 命令短语
const commandPhrases = {
    '结束会话' : async function(text, uid, modelIndex) {
        if (isNewSession) {
            commandPhraseReply = '会话未开始';
            isNewSession = false;
            wantRename = null;
        } else {
            await deleteSession();
            commandPhraseReply = '会话已结束';
        }
    },
    '刷新页面' : async function(text, uid, modelIndex) {
        if (!document.hu60AdminUids || !document.hu60AdminUids.includes(uid)) {
            commandPhraseReply = '您不是管理员，无法进行该操作';
            return;
        }
        commandPhraseReply = '即将刷新页面';
        wantRefresh = true;
    },
    '重试' : async function(text, uid, modelIndex) {
        text = retryChatTexts[uid];
        if (text === undefined || text === '重试') {
            commandPhraseReply = '找不到可重试的发言';
            return;
        }
        await sendText(text, uid, modelIndex);
    }
};

// 执行管理员命令
// 为什么要定义成单独的函数？因为刷新操作需要在发送回复给管理员后再执行，
// 否则页面刷新了就没办法发送回复了。
async function runAdminCommand() {
    // 重命名对话
    await renameWant();

    // 刷新页面
    if (wantRefresh) {
        location.reload();
        wantRefresh = false;
    }
}

/////////////////////////////////////////////////////////////

// Array.from() 的 polyfill
if (!Array.from) {
    Array.from = function (arrayLike, mapFn, thisArg) {
        var array = [];
        for (var i = 0; i < arrayLike.length; i++) {
            if (mapFn) {
                array.push(mapFn.call(thisArg, arrayLike[i], i, arrayLike));
            } else {
                array.push(arrayLike[i]);
            }
        }
        return array;
    };
}

// 休眠指定的毫秒数
// 用法：await sleep(1000)
const sleep = ms => new Promise(r => setTimeout(r, ms));

// 加载外部js
function loadScript(url) {
    var script = document.createElement("script");
    script.src = url;
    document.head.appendChild(script);
}

// 选择模型
async function selectModel(modelIndex) {
    if (!document.querySelector(modelListBoxSelector) && document.querySelector(upgradeToPlusSelector)) {
        // 免费用户没有模型选择器
        return;
    }

    // 等待模型选择器出现
    for (let i=0; i<50 && !document.querySelector(modelListBoxSelector); i++) {
        await sleep(100);
    }

    let box = document.querySelector(modelListBoxSelector);
    if (!box) {
        // 找不到模型选择器
        return;
    }

    let models = document.querySelectorAll(modelListItemSelector);
    if (models.length < 2) {
        // 弹出模型下拉框
        box.click();
        await sleep(100);
        for (let i=0; i<10 && document.querySelectorAll(modelListItemSelector).length < 2; i++) {
            await sleep(100);
        }
        models = document.querySelectorAll(modelListItemSelector);
    }

    // 选择模型
    if (modelIndex < models.length) {
        console.log("selectModel", modelIndex, models[modelIndex].innerText);
        models[modelIndex].click();
        await sleep(100);
    }
}

// 创建新会话
async function newChatSession(name, modelIndex) {
    let sessionIndex = getSessions().length + 1;
    console.log('newChatSession', sessionIndex, modelIndex, 'begin');
    document.querySelector(newChatButtonSelector).click();
    // 等待新建完成
    let i = 0;
    do {
        await sleep(100);
        i++;
    } while (
        (  !document.querySelector(chatBoxSelector)
        || !document.querySelector(sendButtonSelector))
        && i < 100
    );
    // 再多等一会儿，防止意外
    await sleep(100);

    // 选择模型
    await selectModel(modelIndex);

    isNewSession = true;
    wantRename = name;
    console.log('newChatSession', sessionIndex, modelIndex, 'end');
}

// 删除当前会话
async function deleteSession() {
    try {
        let sessionNum = getSessions().length;

        let actionButtons = document.querySelectorAll(actionButtonSelector);
        if (!actionButtons[1]) {
            console.error('deleteSession', '找不到删除按钮');
            return;
        }
        actionButtons[1].click(); // 点击删除按钮
        await sleep(100);

        actionButtons = document.querySelectorAll(actionButtonSelector);
        if (!actionButtons[0]) {
            console.error('deleteSession', '找不到确认按钮');
            return;
        }
        actionButtons[0].click(); // 点击确认按钮

        // 等待删除完成
        for (let i=0; i<100 && getSessions().length >= sessionNum; i++) {
            await sleep(100);
        }

        isNewSession = false;
        wantRename = null;
    } catch (ex) {
        console.error('会话删除失败', ex);
    }
}

// 重命名会话
async function renameSession(newName) {
    try {
        // 存在Show more按钮，点击它，展开完整列表
        for (let i=0; i<5 && document.querySelector(showMoreButtonSelector); i++) {
            document.querySelector(showMoreButtonSelector).click();
            await sleep(1000);
        }

        // 等待加载完成
        for (let i=0; i<100 && (!isFinished() || !getCurrentSession()); i++) {
            await sleep(100);
        }

        // 重命名总是失败，多重试几次
        for (let i=0; i<3; i++) {
            getCurrentSession().click();
            await sleep(100);

            let actionButtons = document.querySelectorAll(actionButtonSelector);
            if (!actionButtons[0]) {
                console.error('renameSession', '找不到编辑按钮');
                return;
            }
            actionButtons[0].click(); // 点击编辑按钮
            await sleep(100);

            let nameInput = document.querySelector(sessionNameInputSelector);
            if (!nameInput) {
                console.error('renameSession', '找不到输入框');
                return;
            }

            // 交替改变新名称，以免毫无变化不尝试保存
            nameInput.value = newName.replace('-', (i==1) ? '.' : '-');
            await sleep(100);

            actionButtons = document.querySelectorAll(actionButtonSelector);
            if (!actionButtons[0]) {
                console.error('renameSession', '找不到确认按钮');
                return;
            }
            actionButtons[0].click(); // 点击确认按钮
            await sleep(100);
        }
    } catch (ex) {
        console.error('会话重命名失败', ex);
    }
}

// 获取会话列表
function getSessions() {
    return document.querySelectorAll(sessionListItemSelector);
}

// 查找会话
async function findSession(name) {
    // 存在Show more按钮，点击它，展开完整列表
    for (let i=0; i<5 && document.querySelector(showMoreButtonSelector); i++) {
        document.querySelector(showMoreButtonSelector).click();
        await sleep(1000);
    }

    // 等待加载完成
    for (let i=0; i<100 && !isFinished(); i++) {
        await sleep(100);
    }

    let sessions = getSessions();
    for (let i=0; i<sessions.length; i++) {
        // 重命名时会交替使用.和-，有可能保存上的是.而非-
        if (sessions[i].innerText.replace('.', '-') == name) {
            return sessions[i];
        }
    }
    return null;
}

// 获取当前session
function getCurrentSession() {
    return document.querySelector(currentSessionSelector);
}

// 获取当前session的名称
function getSessionName() {
    let session = getCurrentSession();
    if (session) {
        // 重命名时会交替使用.和-，有可能保存上的是.而非-
        return session.innerText.replace('.', '-');
    }
    return null;
}

// 切换会话前重命名当前会话
// 缓解重命名失败的方法
async function renameWant() {
    if (wantRename !== null) {
        // 距离回复不到10秒，等够10秒
        // 防止重命名过程中ChatGPT同时自动重命名，导致我们的名称保存失败
        let timeDiff = 10000 - ((new Date().getTime()) - replyFinishTime);
        if (timeDiff > 0) {
            console.log(timeDiff + 'ms 后重命名会话');
            await sleep(timeDiff);
        }

        await renameSession(wantRename);
        wantRename = null;
    }
}

// 切换会话
async function switchSession(name, modelIndex) {
    isNewSession = false;

    let session = await findSession(name);
    if (!session) {
        await renameWant();
        return await newChatSession(name, modelIndex);
    }

    if (getCurrentSession() == session) {
        if (document.querySelector(chatBoxSelector)
         && document.querySelector(sendButtonSelector)) {
            // 无需切换
            return;
        } else {
            // 找不到发言框，可能出错了，尝试新建一个会话
            await deleteSession();
            await newChatSession(name, modelIndex);
        }
    } else {
        // 切换前先重命名当前会话
        await renameWant();
    }

    console.log('switchSession', name, 'begin');
    session.click();

    // 等待切换完成
    let i = 0;
    do {
        await sleep(100);
        i++;
    } while (
        (getSessionName() != name
        || !document.querySelector(chatBoxSelector)
        || !document.querySelector(sendButtonSelector)
        || !isFinished())
        && i < 100
    );
    // 再多等一会儿，防止意外
    await sleep(100);

    // 找不到发言框或发送按钮，当前会话可能出错
    if (!document.querySelector(chatBoxSelector) || !document.querySelector(sendButtonSelector)) {
        console.warn('找不到发言框或发送按钮，尝试删除会话', name);
        await deleteSession();
        return await newChatSession(name, modelIndex);
    }

    console.log('switchSession', name, 'end', i, getSessionName());
}

function makeSessionName(uid, modelIndex) {
    return uid + '-' + modelIndex;
}

// 发送聊天信息
async function sendText(text, uid, modelIndex) {
    try {
        let commandFunc = commandPhrases[text];

        // 保存重试内容
        if (!commandFunc) {
            retryChatTexts[uid] = text;
        }

        // 切换会话
        await switchSession(makeSessionName(uid, modelIndex), modelIndex);

        // 等待加载完成
        for (let i=0; i<100 && !isFinished(); i++) {
            await sleep(100);
        }

        // 执行命令短语
        if (commandFunc) {
            return await commandFunc(text, uid, modelIndex);
        }

        let chatBox = document.querySelector(chatBoxSelector);
        let sendButton = document.querySelector(sendButtonSelector);

        chatBox.click();
        await sleep(100);

        chatBox.value = text;
        await sleep(100);

        sendButton.click();
        await sleep(100);
    } catch (ex) {
        console.error('发言失败', ex);
        commandPhraseReply = '发言失败，请重试。当前会话已丢失。';
        await deleteSession();
    }
}

// 执行聊天信息中的指令
async function sendRequest(text, uid) {
    // 等待现有任务完成
    for (let i=0; i<1200 && !isFinished(); i++) {
        await sleep(100);
    }

    console.log('sendRequest', '@#'+uid, text);

    // 去除待审核提示
    text = text.trim().replace(/^发言待审核，仅管理员和作者本人可见。/s, '').trim();

    // 分割指令
    // 示例：
    //  @ChatGPT，你好
    //  @ChatGPT 2，你好
    let parts = text.match(/^\s*@[^，,：:\s]+(?:\s+(\d+))?[，,：:\s]+(.*)$/s);

    let modelIndex = modelMap[1];

    if (parts) {
        let cmd = parts[1];
        text = parts[2];
    
        if (undefined !== cmd && undefined !== modelMap[Number(cmd)]) {
            modelIndex = modelMap[Number(cmd)];
        }
    }

    isTextEmpty = (text.length == 0);

    await sendText(text, uid, modelIndex);
    return modelIndex;
}

// 读取响应
async function readReply() {
    if (commandPhraseReply) {
        let reply = commandPhraseReply;
        commandPhraseReply = null;
        return reply;
    }

    // 等待回答完成
    let i = 0;
    do {
        await sleep(100);
        i++;
    } while (i<1200 && !isFinished());

    replyFinishTime = new Date().getTime();

    // 加载 html 转 markdown 插件
    let turndownService = null;
    try {
        if (typeof TurndownService == 'function') {
            turndownService = new TurndownService({
                'headingStyle': 'atx',
            });
        } else {
            console.error("找不到 TurndownService，无法处理复杂Markdown排版。\n请确认 " + TurndownService + " 是否正常加载。");
        }

        // 加载 github flavored markdown 插件
        if (turndownService && typeof turndownPluginGfm == 'object') {
            turndownService.use(turndownPluginGfm.tables);
            turndownService.use(turndownPluginGfm.taskListItems);

            // 删除线
            // turndownPluginGfm.strikethrough 实现的不正确，虎绿林只支持 ~~删除线~~，不支持 ~删除线~
            turndownService.addRule('strikethrough', {
                filter: ['del', 's', 'strike'],
                replacement: function (content) {
                    return '~~' + content + '~~';
                }
            });

            // 代码高亮
            turndownService.addRule('highlightedCodeBlock', {
                filter: function (node) {
                    return node.nodeName === 'PRE' && node.querySelector('code.hljs');
                },
                replacement: function (content, node, options) {
                    var lang = node.querySelector('span')?.textContent || ''; // lang span可能不存在
                    var code = node.querySelector('code.hljs').textContent;
                    return (
                        '\n\n' + options.fence + lang + '\n' +
                            code.replace(/[\r\n]+$/s, '') +
                        '\n' + options.fence + '\n\n'
                    )
                }
            });
        } else if (turndownService) {
            console.error("找不到 turndownPluginGfm，无法处理复杂Markdown排版。\n请确认 " + turndownGfmJsUrl + " 是否正常加载。");
        }
    } catch (ex) {
        console.error('turndown 加载失败', ex);
    }

    // 获取内容DOM
    let reply = null;
    // 等待内容出现
    i = 0;
    do {
        reply = Array.from(document.querySelectorAll(chatReplySelector)).at(-1);
        i++;
    } while (i<50 && !reply && !await sleep(100));
    // 如果内容不为空，至少会有一个Text子节点
    if (!reply || !reply.childNodes) {
        if (isNewSession && isTextEmpty) {
            return "会话不存在，无法读取上一条回复。请发送非空留言。";
        }
        return "读取回复出错，请稍后重试，或尝试@[empty]其他机器人。" + robotList + "\n\n@老虎会游泳，可能需要检查机器人代码问题。";
    }

    // 用插件 html 转 markdown
    if (turndownService) {
        try {
            return turndownService.turndown(reply);
        } catch (ex) {
            console.error('turndown 转换失败', ex);
        }
    }

    // 插件加载或转换失败，手动 html 转 markdown
    let lines = [];
    reply.childNodes.forEach(x => {
        if (x.tagName == 'PRE') { // 代码
            let lang = x.querySelector('span')?.innerText || '';
            let code = x.querySelector('code').innerText.replace(/[\r\n]+$/s, '');
            lines.push("\n```" + lang + "\n" + code + "\n```\n");
        } else { // 正文
            lines.push(x.innerText);
        }
    });
    return lines.join("\n\n");
}

// 判断响应是否结束
function isFinished() {
    return !document.querySelector(replyNotReadySelector);
}

// 读取@消息
async function readAtInfo() {
    let response = await fetch(hu60BaseUrl + 'msg.index.@.no.json?_origin=*&_json=compact&_content=json', {
        redirect: "manual" // 不自动重定向
    });
    if (response.type == 'opaqueredirect') {
        // 登录失效，要求重新登录
        await login(true);
        return await readAtInfo();
    }
    return await response.json();
}

// 读取帖子内容
async function readTopicContent(path) {
    let url = hu60BaseUrl + path.replace('{$BID}', 'json')
        .replace(/#.*$/s, '') // 去掉锚链接
        .replace(
            /\?|$/s, // 注意主题帖的@链接不含问号
            '?_origin=*&_json=compact&_content=text&pageSize=1&'
        );
    let response = await fetch(url);
    return await response.json();
}

// 回复帖子
async function replyTopic(uid, replyText, topicObject) {
    replyText = errorMap[replyText.substr(0, errorMaxLen)] || replyText; // 翻译错误提示

    let content = "<!md>\n";
    if (isNewSession) {
        content += '[新会话] ';
    } else if (isTextEmpty) {
        content += '[上一条回复] ';
    }
    content += "@#" + uid + "，" + replyText;
    console.log('replyTopic', content);

    let url = null;
    if (topicObject.tMeta) { // 帖子
        url = 'bbs.newreply.' + encodeURIComponent(topicObject.tContents[0].topic_id) + '.json';
    } else { // 聊天室
        url = 'addin.chat.' + encodeURIComponent(topicObject.chatRomName) + '.json';
    }

    let formData = new FormData();
    formData.append('content', content);
    formData.append('token', topicObject.token);
    formData.append('go', '1');

    let response = await fetch(hu60BaseUrl + url + '?_origin=*&_json=compact', {
        body: formData,
        method: "post",
        redirect: "manual" // 不自动重定向
    });
    return response;
}

// 回复@信息
async function replyAtInfo(info) {
    try {
        let uid = info.byuid;
        let url = info.content[0].url;

        // 防止自己和自己对话
        if (uid == hu60MyUid || uid < 1) {
            return;
        }

        console.log('replyAtInfo', hu60Url + url.replace('{$BID}', 'html'));

        let topicObject = await readTopicContent(url);
        let text = null;
        if (topicObject.tContents) {
            text = topicObject.tContents[0].content;
        } else {
            text = topicObject.chatList[0].content;
        }

        let modelIndex = await sendRequest(text, uid);
        let replyText = await readReply();

        try {
            let response = await replyTopic(uid, replyText, topicObject);
            if (response.type == 'opaqueredirect') {
                console.log('success:', true);
            } else {
                console.log(await response.text());
            }
        } catch (ex) {
            console.error(ex);
        }
    } catch (ex) {
        console.error(ex);
    }

    // 重命名会话
    await renameWant();
}

// 登录虎绿林
async function login(relogin) {
    try {
        console.log('登录虎绿林');

        if (relogin || !localStorage.hu60User || !localStorage.hu60Pwd) {
            localStorage.hu60User = prompt("虎绿林用户名：");
            localStorage.hu60Pwd = prompt("虎绿林密码：");
        }

        let formData = new FormData();
        formData.append('type', '1'); // 用户名登录
        formData.append('name', localStorage.hu60User);
        formData.append('pass', localStorage.hu60Pwd);
        formData.append('go', '1');

        let response = await fetch(hu60Url + 'user.login.json?_origin=*&_json=compact', {
            body: formData,
            method: "post",
            redirect: "manual" // 不自动重定向
        });
        let result = await response.json();
        if (!result.success) {
            throw result.notice;
        }

        hu60BaseUrl = hu60Url + result.sid + '/';
        hu60MyUid = result.uid;
    } catch (ex) {
        console.log(ex);
        alert('登录失败：' + ex);
        return await login(true);
    }
}

// 运行机器人
async function run() {
    loadScript(turndownJsUrl);
    loadScript(turndownGfmJsUrl);

    // 如果油猴定义了自定义主循环，则使用该主循环
    // 用于把机器人接入其他类型的网站
    if (document.run) {
        return await document.run();
    }

    await login();
    console.log('虎绿林ChatGPT机器人已启动');

    while (true) {
        try {
            // 浏览器用户可能直接输入了问题，等待回答完成
            for (let i=0; i<1200 && !isFinished(); i++) {
                await sleep(100);
            }

            let atInfo = await readAtInfo();
            let exceptionCount = 0;
            // @消息是后收到的在前面，所以从后往前循环，先发的先处理
            for (let i = atInfo.msgList.length - 1; i>=0; i--) {
                try {
                    await replyAtInfo(atInfo.msgList[i]);
                    await sleep(100);
                } catch (ex) {
                    exceptionCount++;
                    console.error(ex);
                    await sleep(1000);
                }
            }
            // 执行管理员命令
            await runAdminCommand();
            // 异常太多，刷新页面
            if (exceptionCount > 0 && exceptionCount >= atInfo.msgList.length) {
                location.reload();
            }
            await sleep(1000);
        } catch (ex) {
            console.error(ex);
            await sleep(1000);
        }
    }
}

run();
