# レコードのラベルの重複

## Gotanda.hs #1 @HARP

### 岡本和樹 @kakkun61

---

## つらみ

---

よくあるつらみ

```haskell
data Person =
  Person
    { personName :: String
    , personAge :: Word
    , personCompany :: Maybe Company
    }
data Company = Company { companyName :: String }
```

---

`name` って付けたいやん

---

## 提案

---

- [Simple Overloaded Record Fields (SORF)](https://gitlab.haskell.org/ghc/ghc/wikis/records/overloaded-record-fields/sorf)
  - Simon PJ's original proposal
- [Declared Overloaded Record Fields (DORF)](https://gitlab.haskell.org/ghc/ghc/wikis/records/declared-overloaded-record-fields)
  - a counterpoint proposal by Anthony Clayden
- [Overloaded Record Fields (Original)](https://gitlab.haskell.org/ghc/ghc/wikis/records/overloaded-record-fields/design)
  - Adam Gundry
- [Overloaded Record Fields (Redesign)](https://gitlab.haskell.org/ghc/ghc/wikis/records/overloaded-record-fields/redesign)
  - Adam Gundry

---

## Overloaded Record Fields (Redesign)

---

`#name` という特殊な記法で多相な関数が使えるようになる

```haskell
data Person = Person { name :: String }
data Company = Company { name :: String }

let me = Person "Kazuki"
#name me -- > Kazuki
```
--- 

大きい提案だったので分割された

1. `DuplicateRecordFields` (in GHC 8.0)
1. `OverloadedLabels` (in GHC 8.0)
1. Magic type classes (partly in GHC 8.2)

---

## `DuplicateRecordFields`

---

重複したレコードのラベルを定義できるようになる

```haskell
data Person = Person { name :: String }
data Company = Company { name :: String }
```

---

関数的な使用はできない

```haskell
let me = Person "Kazuki"
name me
-- Ambiguous occurrence ‘name’
```

---

パターンマッチでは使える

```haskell
hello Person { name = name } = "Hello, " ++ name ++ "."
hello me
```

---

個人的には `DuplicateRecordFields` と `NamedFieldPuns` で大半のケースを楽になる

```haskell
hello Person { name } = "Hello, " ++ name ++ "."
hello me
```

---

## `OverloadedLabels`

---

`#name` という記法が使えるようになる

```haskell
#name me -- > "Kazuki"
```

---

そのためには準備が必要

```haskell
:set -XDataKinds -XFlexibleInstances -XMultiParamTypeClasses

import GHC.OverloadedLabels (IsLabel (fromLabel))

instance IsLabel "name" (Person -> String) where
  fromLabel Person { name } = name
```

```haskell
:set -XFlexibleContexts
#name me :: String
```

Note:

- 使用時、型注釈がないと `Ambiguous type variable ‘a0’ arising from a use of ‘print’`

---

## Magic type classes

---

全部に `IsLabel` のインスタンスを定義するのはしんどい

---

`HasField` クラスのインスタンスが自動的に生成されるようになった

```haskell
import GHC.Records (HasField (getField))

instance HasField "name" Person String where
  getField Person { name } = name
```

---

`HasField` なら `IsLabel` とすればよい

```haskell
instance HasField x r a => IsLabel x (r -> a) where
  fromLabel = getField @x
```

---

## 調べきれていないところ

- `instance HasField x r a => IsLabel x (r -> a)` はライブラリー内で書いてしまってよい？
  - 他のライブラリーが同様のインスタンスを定義していたら衝突するのでは？
- `instance HasField x r a => IsLabel x (r -> a)` は将来的には標準で定義される？

---

## Record Set Field Proposal

---

今のところ get しかできないので set もできるようにしよう

```haskell
class HasField x r a | x r -> a where
  hasField :: r -> (a -> r, a)
-- OR
  getField :: r -> a
  setField :: r -> a -> r
```

---

## 参考

- [overloaded record fields · Wiki · Glasgow Haskell Compiler / GHC · GitLab](https://gitlab.haskell.org/ghc/ghc/wikis/records/overloaded-record-fields)
- [ghc-proposals/0158-record-set-field.rst at master · ghc-proposals/ghc-proposals](https://github.com/ghc-proposals/ghc-proposals/blob/master/proposals/0158-record-set-field.rst)

---

<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="クリエイティブ・コモンズ・ライセンス" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br /><a xmlns:cc="http://creativecommons.org/ns#" href="https://github.com/kakkun61/gitpitch/tree/master/gotanda.hs-1" property="cc:attributionName" rel="cc:attributionURL">岡本和樹（Kazuki Okamoto）</a> 作『<span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">レコードのラベルの重複 - Gotanda.hs #1 @HARP</span>』は<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">クリエイティブ・コモンズ 表示 - 非営利 4.0 国際 ライセンス</a>で提供されています。
