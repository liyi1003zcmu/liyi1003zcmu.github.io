/*
 * 大教室课件的统一分步呈现规则。
 * 在 Reveal.initialize() 之前加载；后续课件可直接复用。
 * 单页如不需要自动动画，可在叶子 section 上添加 data-auto-fragments="off"。
 */
(function () {
  const slides = Array.from(document.querySelectorAll('.reveal .slides section')).filter(
    (section) => !Array.from(section.children).some((child) => child.tagName === 'SECTION'),
  );

  function mark(element, index) {
    if (!element || element.matches('.eyebrow, h1, h2, .footer-src')) return;
    element.classList.add('fragment', 'fade-up');
    element.dataset.fragmentIndex = String(index);
  }

  function sequenceChildren(container, index) {
    const children = Array.from(container.children);
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      if (child.matches('.arrow, .course-arrow, .pipe-arrow')) continue;

      const previous = children[i - 1];
      if (previous && previous.matches('.arrow, .course-arrow, .pipe-arrow')) {
        mark(previous, index);
      }
      mark(child, index);
      index += 1;
    }
    return index;
  }

  function sequenceBlock(block, index) {
    if (
      block.matches(
        '.grid2, .grid3, .grid4, .compare, .course-map, .pipeline-road, .pipeline-final-flow, .webgpu-flow, .flow, .ch0-resource-list, .ch0-score-grid',
      )
    ) {
      return sequenceChildren(block, index);
    }
    if (block.matches('table')) {
      const rows = block.querySelectorAll('tbody > tr');
      if (rows.length) {
        rows.forEach((row) => {
          mark(row, index);
          index += 1;
        });
        return index;
      }
    }
    mark(block, index);
    return index + 1;
  }

  slides.forEach((slide) => {
    if (slide.dataset.autoFragments === 'off') return;

    const heading = slide.querySelector(':scope > h2');
    if (heading) {
      const length = heading.textContent.replace(/\s+/g, '').length;
      if (length >= 34) heading.classList.add('very-long-title');
      else if (length >= 24) heading.classList.add('long-title');
    }

    let index = 0;
    const directChildren = Array.from(slide.children);
    directChildren.forEach((block) => {
      if (block.matches('.eyebrow, h1, h2, .footer-src')) return;
      if (block.classList.contains('title-slide')) {
        Array.from(block.children).forEach((titleBlock) => {
          if (titleBlock.matches('.eyebrow, h1')) return;
          index = sequenceBlock(titleBlock, index);
        });
      } else {
        index = sequenceBlock(block, index);
      }
    });
  });
})();
