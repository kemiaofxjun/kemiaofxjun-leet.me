---
title: git 常用命令
date: 2024-07-26
duration: 4min
type: notes
art: random
---

[[toc]]

## 日常记录(未完善)
| 使用场景 | 命令示例 | 功能说明 |
|----------|----------|----------|
| **仓库初始化** | `git init` | 把当前目录变成 Git 仓库 |
| **获取远程仓库** | `git clone <URL>` | 下载远程仓库及完整历史 |
| **查看状态** | `git status` | 显示工作区/暂存区变动摘要 |
| **加入暂存区** | `git add .` | 跟踪并暂存所有新增、修改 |
| **提交版本** | `git commit -m "msg"` | 把暂存区内容生成一次快照 |
| **查看历史** | `git log --oneline` | 简洁列出提交记录 |
| **创建分支** | `git branch feat` | 基于当前提交新建分支 |
| **切换分支** | `git checkout feat` | 切换到已有分支 |
| **创建并切换** | `git checkout -b feat` | 上两条命令的合并写法 |
| **合并分支** | `git merge feat` | 把 `feat` 合并到当前分支 |
| **删除分支** | `git branch -d feat` | 合并后安全删除分支 |
| **连接远程** | `git remote add origin <URL>` | 把本地仓库关联到远程 |
| **推送到远程** | `git push -u origin main` | 首次推送并建立上游跟踪 |
| **日常推送** | `git push` | 上传本地新提交 |
| **拉取更新** | `git pull` | 获取远程最新提交并合并 |
| **仅下载** | `git fetch` | 只下载不合并，适合 review |
| **暂存工作区** | `git stash` | 把未提交改动“压栈”保存 |
| **恢复暂存** | `git stash pop` | 还原最近一次 stash 并出栈 |
| **撤销工作区修改** | `git checkout -- <file>` | 丢弃对文件的未暂存改动 |
| **撤销暂存区文件** | `git reset HEAD <file>` | 把文件从暂存区移回工作区 |
| **回退提交** | `git revert <commit>` | 生成一个新提交来反做指定提交 |
| **查看差异** | `git diff` | 工作区 vs 暂存区差异 |
| **标签版本** | `git tag v1.0` | 给当前提交打轻量标签 |
| **推送标签** | `git push origin v1.0` | 把标签上传到远程 |
