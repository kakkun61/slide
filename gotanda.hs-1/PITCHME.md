# レコードのラベルの重複

## Gotanda.hs #1 @HARP

## 岡本和樹

### @kakkun61

---

## あらすじ

1. つらみ事例を上げる
1. Proposal
  - Overloaded Record Fields Proposal
  - https://gitlab.haskell.org/ghc/ghc/wikis/records/overloaded-record-fields
1. 歴史
  1. いくつかの不採用の提案
  1. ORF
    1. Part 1: DuplicateRecordFields (in GHC 8.0)
    1. Part 2: OverloadedLabels (in GHC 8.0)
    1. Part 3: Magic type classes (partly in GHC 8.2)
1. DuplicateRecordFields
  - 重複した定義と型が分かる場合に使える
  - NamedFieldPans とよく使う（個人的に）
1. OverloadedLabels
  - IsLabel 型クラスのインスタンスだとアドホック多相な #foo 関数が使える
1. Magic type classes
  - 名前の付けられたフィールドがあると HasField 型クラスが自動的に生成される
  - HasField 型クラスのインスタンスなら IsLabel 型のインスタンスであることを書ける
    - https://github.com/iij-ii/postgresql-pure/blob/master/src/Database/PostgreSQL/Pure/Internal/IsLabel.hs
      - これライブラリーに書くとまずい？
        - インスタンスの多重定義の可能性が
1. Record Set Field Proposal
  - https://github.com/ghc-proposals/ghc-proposals/blob/master/proposals/0158-record-set-field.rst
