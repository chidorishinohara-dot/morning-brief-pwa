# 今日计划

一个适合安装到 iPhone 主屏幕的本地优先学习计划 PWA。

在线地址：

https://chidorishinohara-dot.github.io/morning-brief-pwa/

## 功能

- 首页固定展示当天最重要的 3 项任务
- 展示下一项安排和最近 3 场考试倒计时
- 日程页集中查看课程、DDL、考试地点和座位
- 完成状态保存在当前设备
- 支持添加自定义长期计划
- 下载每天 08:00 的 iPhone 日历提醒
- Service Worker 支持离线查看

## 本地预览

```powershell
python -m http.server 8787 --bind 127.0.0.1
```

打开：

```text
http://127.0.0.1:8787/
```

## 安装到 iPhone

1. 使用 iPhone Safari 打开在线地址。
2. 点“分享”。
3. 选择“添加到主屏幕”。
4. 在设置页下载并导入 08:00 日历提醒。

## 当前边界

- 当前版本没有账号和后端。
- 任务完成状态不会同步到其他设备。
- 网页不能静默创建 iOS 提醒事项，因此使用日历事件提醒。
- GitHub Pages 已发布；云端每日数据更新尚未实现。
