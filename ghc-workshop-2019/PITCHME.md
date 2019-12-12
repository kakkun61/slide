# Hadrian

## GHC 勉強会 2019

### 岡本和樹 @kakkun61

---

## Hadrian とは

- 新しいGHC 用のビルドシステム
  - 「[8.8 から Make の置き換えを期待](https://gitlab.haskell.org/ghc/ghc/blob/070f7b852a2662e8b5058c2fb40ef1c5a25c86d7/hadrian/README.md)」
  - 現状両方使える
- Shake で実装されている

---

## Shake とは

- Make の代替
- Haskell のライブラリーとして提供
- スクリプトは Haskell の EDSL
- 並列ビルド
- プロファイリング
- **動的に依存関係を切り替えられる**

NOTE:

- 「動的に依存関係を切り替えられる」ことについては後ほど

---

## Hadrian と Shake の関係

```
    +--------------+
    | cc, ld, etc. |
    +--------------+
      ^
      | 2. call
+------+ 1. read  +----------+
| Make |--------->| Makefile |
+------+          +----------+
```

```
       +--------------+
       | cc, ld, etc. |
       +--------------+
                     ^
                     | 2. call
+-------+ 1. depend +---------+
| Shake |<----------| Hadrian |
+-------+           +---------+
```

---

## 「動的に依存関係を切り替えられる」とは

```haskell
"result.tar" *> \_ -> do
  need ["list.txt"]
  contents <- readFileLines "list.txt"
  need contents
  system' "tar" $ ["-cf", "result.tar"] ++ contents
```

NOTE:

- 参考 1 より引用

---

## どんなときに嬉しいか

- C ソースコードからヘッダーファイル名を抜き出して依存先にする、など
  - Make ではできず、Makefile の動的生成などが必要
  - Configure がやっていたことも Shake にできる
- その C ソースコードがビルドの事前ステップで生成される場合でも大丈夫
  - Makefile 動的生成では対応できない

---

## GHC のビルドにどう役立っているか

![Comparison of GHC build systems on common use cases. Checkmarks ✔ indicate desired behaviour.](ghc-workshop-2019/make-vs-shake-on-building-ghc.png)

NOTE:

- 参考 2 より引用

---

フルビルド時

```text
# time sh -c './boot && ./configure && make -j10'
…
real    28m27.218s
user    142m53.830s
sys     6m58.440s
```

```text
# hadrian/build.sh -j10 --configure
…
Build completed in 49m31s
```

あれ？

---

## 参考

1. Neil Mitchell “Shake Before Building - Replacing Make with Haskell”
2. Andrey Mokhov, Neil Mitchell, Simon Peyton Jones, Simon Marlow “Non-recursive Make Considered Harmful - Build Systems at Scale”

---

## スライドソース

https://github.com/kakkun61/gitpitch/tree/master/ghc-workshop-2019

---

<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="クリエイティブ・コモンズ・ライセンス" style="border-width:0" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc.svg" /></a>

<a xmlns:cc="http://creativecommons.org/ns#" href="https://github.com/kakkun61/gitpitch/tree/master/ghc-workshop-2019" property="cc:attributionName" rel="cc:attributionURL">岡本和樹（Kazuki Okamoto）</a>作『<span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Hadrian - GHC 勉強会 2019</span>』は<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">クリエイティブ・コモンズ 表示 - 非営利 4.0 国際 ライセンス</a>で提供されています。
