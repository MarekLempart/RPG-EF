# RPG-EF

Repozytorium zawiera aplikację w React Native z TypeScript. Poniżej znajdziesz zasady pracy zespołowej oparte na strategii GitFlow.

---

## Spis treści

- [GitFlow – Zasady pracy](#gitflow--zasady-pracy)
- [Branch Protection](#branch-protection)
- [Instrukcje dla deweloperów](#instrukcje-dla-deweloperów)
- [Documentation in English](#documentation-in-english)

---

## GitFlow – Zasady pracy

1. **Gałąź `main`:**
   - To główna gałąź produkcyjna. Żadne zmiany nie powinny być wprowadzane bezpośrednio – wszystkie zmiany trafiają przez Pull Requesty.
2. **Gałąź `develop`:**
   - To główna gałąź deweloperska. Na jej bazie powstają gałęzie `feature` oraz `release`.
3. **Gałęzie `feature/*`:**

   - Służą do tworzenia nowych funkcjonalności.
   - Utwórz gałąź: `git checkout -b feature/nazwa-funkcjonalnosci` z gałęzi `develop`.
   - Po zakończeniu prac otwórz PR, aby scalić zmiany z `develop`.

4. **Gałęzie `release/*`:**

   - Powstają z gałęzi `develop`, gdy zbiór zmian jest gotowy do wydania.
   - Testuj i wprowadzaj poprawki na tej gałęzi.
   - Po zatwierdzeniu scal do `main` (oraz taguj wersję) i scal z powrotem do `develop`.

5. **Gałęzie `hotfix/*`:**
   - Używane do szybkich napraw krytycznych błędów na produkcji.
   - Utwórz z gałęzi `main`, wprowadź poprawki, a następnie scali z `main` i `develop`.

---

## Branch Protection

W repozytorium ustawiliśmy ochronę gałęzi `main` i `develop`:

- **Wymagane Pull Requesty:**  
  Zmiany trafiające do tych gałęzi muszą być zatwierdzone przez przynajmniej jednego recenzenta.
- **Status Checks:**  
  (Opcjonalnie) Wymagane, aby wszystkie testy przechodziły pomyślnie przed scałeniem PR.
- **Ograniczone uprawnienia:**  
  Tylko wyznaczeni deweloperzy lub zespoły mogą bezpośrednio pushować zmiany.

---

## Instrukcje dla deweloperów

1. **Przed rozpoczęciem pracy:**

   - Zawsze pobierz najnowsze zmiany z gałęzi `develop`:
     ```bash
     git checkout develop
     git pull origin develop
     ```

2. **Tworzenie nowej funkcjonalności:**

   - Utwórz gałąź feature z `develop`:
     ```bash
     git checkout -b feature/nazwa-funkcjonalnosci
     ```
   - Wypchnij gałąź:
     ```bash
     git push -u origin feature/nazwa-funkcjonalnosci
     ```
   - Po zakończeniu prac otwórz Pull Request do `develop`.

3. **Przygotowanie wydania:**

   - Z gałęzi `develop` utwórz gałąź release, np.:
     ```bash
     git checkout -b release/v1.0.0
     git push -u origin release/v1.0.0
     ```
   - Po przetestowaniu i zatwierdzeniu zmian scal PR do `main` i oznacz wydanie tagiem.

4. **Naprawa błędów (hotfix):**

   - W przypadku krytycznych błędów utwórz gałąź hotfix z `main`:
     ```bash
     git checkout main
     git checkout -b hotfix/nazwa-hotfix
     git push -u origin hotfix/nazwa-hotfix
     ```
   - Po wprowadzeniu poprawek scal zmiany do `main` oraz `develop`.

5. **Po scaleniu:**
   - Usuń lokalne i zdalne gałęzie, które nie są już potrzebne.

---

## Documentation in English

### GitFlow – Workflow Guidelines

1. **`main` branch:**

   - Represents production code. No direct commits are allowed. All changes must go through Pull Requests (PR).

2. **`develop` branch:**

   - Main development branch. All new features and changes are merged here through PRs.

3. **`feature/*` branches:**

   - Used for developing new features.
   - Create a feature branch from `develop`:
     ```bash
     git checkout -b feature/feature-name
     ```
   - After completing the feature, open a PR to merge changes into `develop`.

4. **`release/*` branches:**

   - Created from `develop` when the codebase is ready for a new release.
   - Perform final testing and bug fixes on this branch.
   - Once approved, merge into `main` (and tag the release) and also merge back into `develop`.

5. **`hotfix/*` branches:**
   - Used for urgent fixes on the production code.
   - Create a hotfix branch from `main`, implement the fix, and then merge back into both `main` and `develop`.

### Branch Protection

- **Required Pull Requests:**  
  Changes to `main` and `develop` must be merged via PRs and approved by at least one reviewer.
- **Status Checks:**  
  (Optional) Ensure all tests pass before merging.
- **Restricted Push Access:**  
  Only designated developers or teams can push directly to these branches.

### Developer Guidelines

1. **Before starting work:**

   - Always update your local `develop` branch:
     ```bash
     git checkout develop
     git pull origin develop
     ```

2. **Creating a new feature:**

   - Create a feature branch from `develop`:
     ```bash
     git checkout -b feature/feature-name
     ```
   - Push the branch:
     ```bash
     git push -u origin feature/feature-name
     ```
   - When finished, open a Pull Request to merge into `develop`.

3. **Preparing a release:**

   - Create a release branch from `develop`, for example:
     ```bash
     git checkout -b release/v1.0.0
     git push -u origin release/v1.0.0
     ```
   - After testing and review, merge the release branch into `main` and tag the release.

4. **Fixing production issues (hotfix):**

   - For critical bugs, create a hotfix branch from `main`:
     ```bash
     git checkout main
     git checkout -b hotfix/issue-name
     git push -u origin hotfix/issue-name
     ```
   - After the fix, merge into both `main` and `develop`.

5. **Post-merge:**
   - Delete branches that are no longer needed, both locally and remotely.

---
