# Generic Project Audit Instructions

You are an agent tasked with auditing this project. This prompt is designed for **documentation-heavy, content-driven projects** such as educational platforms, course materials, documentation sites, blogs, or similar content-focused repositories. Perform a comprehensive **codebase and content sanity check** with the following objectives.

## 🔎 **Audit Focus Areas**

1. **Incomplete Content & Placeholders:** Scan all markdown (MD/MDX) files for any signs of unfinished content. This includes:

   * Placeholder text such as "TODO", "Lorem Ipsum", "Coming soon", "Under construction", or similar.
   * Sections that appear AI-generated but not properly edited (e.g. off-topic rambling or inconsistent tone that suggests *AI drift*).
   * Any obvious gaps where content is promised but not provided (e.g. a header followed by an empty section).

2. **Broken Links & Missing Media:** Identify any internal links or media references that might be broken or outdated:

   * Links pointing to files or sections that don't exist.
   * Image or audio embeds with paths that are incorrect or files that are missing.
   * References to code files or resources that have been moved or renamed.

3. **Formatting Inconsistencies:** Check for uniformity and proper formatting in the content:

   * Heading levels should be logical (e.g. main sections might start with `# Title`, subsections with `##`, etc.). Flag any irregular header hierarchy or formatting.
   * Inconsistent use of markdown features (bold, italics, blockquotes, callouts) across content files. For example, if callouts or tips are formatted differently in different files.
   * Any MDX syntax issues or rendering problems (such as unclosed tags, incorrect code fences, broken tables).

4. **Structural Issues & Length:** Review the structure of content files and organization:

   * Flag any **overly long files** that might overwhelm readers (e.g. a single content file that spans thousands of lines). Such content might need splitting into smaller sections or better segmentation.
   * Check if the content order is logical (e.g. numbering of sections/pages is consistent) and if any content seems out of place or duplicated.
   * Note any structural elements that are unclear or confusing in arrangement (like a section missing an introduction or summary where others have them).

5. **Duplicate or Overlapping Content:** Detect if any content is **duplicated** across the repository:

   * Same paragraphs or lists appearing in multiple content files (which could indicate copy-paste without modification).
   * Overlap between different content sections or documentation areas that might cause redundancy or confusion.
   * If duplicates exist, suggest consolidating or cross-referencing instead of repetition.

6. **Embedded Code Blocks:** Examine any code examples or snippets included in the content:

   * Verify if code blocks (in markdown or within MDX) appear complete and syntactically correct. If a code snippet is meant to be run (e.g. a sample script), ensure it’s not obviously broken or missing context.
   * If certain code is intentionally incomplete (for an exercise), that's okay — but it should be clearly indicated. Flag any code block that looks unintentionally half-finished or inconsistent with the surrounding explanation.
   * Ensure that references to code (like file paths or function names in text) actually exist in the codebase or content, to avoid confusing the reader.

7. **Overall Content Quality:** Note any other issues affecting content quality or accuracy:

   * Typos, grammatical errors, or awkward phrasing that could be improved (you do **not** need to fix them, just flag major ones if they impede understanding).
   * Outdated information (for example, if the content references future features that have since been implemented or changed).
   * Compliance with the project's own stated rules or standards (e.g. if the project requires certain disclaimers, formatting standards, or content guidelines, check that these are consistently applied).

## 📋 **Output Requirements**

Your report should be a **well-structured Markdown document** with clearly labeled sections, making it easy for the development team to read and follow up on issues. Please include the following sections in your output:

* **Summary of Top Issues:** Start with a short bullet-point list or brief paragraph summarizing the most important or high-impact issues you found. (For example: "*Multiple content files contain 'TODO' placeholders*, *Several broken image links in various sections*, *Inconsistent heading levels across content*, etc.)

* **Findings by Category:** Organize the detailed findings under subheadings for each category (Incomplete Content, Broken Links, Formatting, Structural Issues, Duplicates, Code Blocks, etc., as appropriate). Under each subheading, list the specific issues:

  * Describe each issue clearly and concisely. Include the **file path** and, if possible, the relevant **line number or section** where the problem occurs. For example: `content/docs/getting-started.mdx – Line 120: "TODO: add more details about setup" (Unfinished content placeholder).`
  * For each item, provide a suggestion or **recommendation** for how to address it. (E.g., "Replace placeholder with actual content about XYZ," or "Update the link to point to the correct resource," etc.)
  * **Confidence Level:** After each finding, indicate how confident you are that this is a genuine issue and not a false alarm. You can use terms like “Confidence: High” (certain it's a problem), “Medium” (fairly sure), or “Low” (something to double-check). For example: *Confidence: High* if you find a clearly broken link, or *Confidence: Medium* if you're not entirely sure if a duplication was intentional or not.

* **Improvements Plan (Optional):** Conclude with a section suggesting an overall plan of action. This can be a list of recommended fixes or tasks, each labeled with a **priority level**:

  * For instance, **P1 (High Priority)** for things that severely affect user experience or content correctness (like broken links, major missing content), **P2 (Medium Priority)** for moderate issues (inconsistencies, minor duplicates), and **P3 (Low Priority)** for nice-to-have improvements (typos, minor formatting tweaks).
  * You can format this as a bullet list or a table. *Example:* `P1 – Fix all "TODO" placeholders in content files (replace with actual content)`, `P2 – Split oversized content file into smaller sections`, `P3 – Standardize callout formatting across all content`.

**Note:** The Improvements Plan is optional but appreciated if you have time – it helps prioritize the cleanup efforts.

## ⚠️ **Guidelines & Constraints**

* **No Content Rewriting:** *Do not* directly rewrite or fix the content in your output. This audit is to report issues and suggest changes, **not** to provide rewritten content material. Keep your tone objective and advisory.

* **Respect Ignore Rules:** Only analyze files relevant to the project content and documentation. **Ignore any files or directories specified in the repository's `.gitignore` or `.cursorignore` (if present).** For example, you should skip node\_modules, build output directories, or any config files that aren't user-facing. Focus on content directories (like `content/`, `docs/`, `pages/`, etc.), relevant parts of `app/` or `src/` (if they contain hard-coded content or placeholders), and documentation areas that influence content structure.

* **User-Facing Focus:** Prioritize issues in content that will be visible to end users. Internal developer documentation can be checked for consistency but is less critical than the actual user-facing content.

* **Thoroughness:** Aim to cover as many of the above categories as possible. However, if the repository is very large, you may summarize patterns (e.g. "Many content files have the same placeholder text...") rather than listing every file. Ensure **each category** of issue is checked.

* **Clarity and Professionalism:** Write the final report in a way that is easy to follow. Use bullet points or numbered lists for clarity, and maintain a professional tone as if delivering an audit report to the project team. Avoid overly apologetic or uncertain language; if you're unsure about something, state it as a caution with a confidence level.

By following these instructions, you will produce a comprehensive audit report that identifies content and structural issues in the repository and helps the team improve the quality and consistency of their project. Good luck with the analysis, and be sure to **double-check all findings** for accuracy.
