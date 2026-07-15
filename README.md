# Full-Class-Left-Spots

满班剩余名额图片生成工具，已从原 `static_site` 中拆分为独立静态项目。

## 更新老师数据

修改 `teacher-team.xlsx` 后，在本目录运行：

```powershell
python scripts/build_static_site.py
```

脚本会重新生成：

- `assets/teachers.json`
- `assets/avatars/*.png`

## 本地预览

```powershell
python -m http.server 8765
```

然后访问：

```text
http://127.0.0.1:8765
```

## Netlify

这个仓库是纯静态站点，Netlify 的发布目录设置为项目根目录 `.`，构建命令可留空。
