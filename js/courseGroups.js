const VISIBLE_ITEMS_PER_GROUP = 4;

const GROUP_DEFINITIONS = [
  {
    headingId: "formation2",
    itemSelector: ".education-box",
    groupBy: () => "formacion",
  },
  {
    headingId: "proyectos",
    itemSelector: ".education-box.line",
    groupBy: () => "proyectos",
  },
  {
    headingId: "cursos",
    itemSelector: ".education-box.line",
    groupBy: (item) => item.querySelector(".content[data-issuer-group]")?.dataset.issuerGroup,
  },
];

const getCurrentLang = () =>
  document.documentElement.lang?.toLowerCase().startsWith("en") ? "en" : "es";

const getToggleLabels = (lang, groupName, hiddenCount, expanded) => {
  if (lang === "en") {
    return {
      more: groupName ? `View ${hiddenCount} more from ${groupName}` : `View ${hiddenCount} more`,
      less: groupName ? `Show fewer from ${groupName}` : "Show fewer",
    };
  }

  return {
    more: groupName ? `Ver ${hiddenCount} mas de ${groupName}` : `Ver ${hiddenCount} mas`,
    less: groupName ? `Ver menos de ${groupName}` : "Ver menos",
  };
};

const updateToggleLabel = (button) => {
  const groupName = button.dataset.groupName || "";
  const hiddenCount = Number(button.dataset.hiddenCount || "0");
  const expanded = button.getAttribute("aria-expanded") === "true";
  const labels = getToggleLabels(getCurrentLang(), groupName, hiddenCount, expanded);
  button.textContent = expanded ? labels.less : labels.more;
};

const revealItems = (items) => {
  items.forEach((item, index) => {
    item.hidden = false;
    item.classList.remove("course-item-enter");

    requestAnimationFrame(() => {
      setTimeout(() => {
        item.classList.add("course-item-enter");
      }, index * 70);
    });
  });
};

const collapseItems = (items) => {
  items.forEach((item) => {
    item.hidden = true;
    item.classList.remove("course-item-enter");
  });
};

const createToggleButton = (groupName, hiddenItems) => {
  const toggleWrap = document.createElement("div");
  toggleWrap.className = "education-group-toggle";

  const toggleButton = document.createElement("button");
  toggleButton.type = "button";
  toggleButton.className = "btn education-toggle-btn";
  toggleButton.dataset.groupName = groupName || "";
  toggleButton.dataset.hiddenCount = String(hiddenItems.length);
  toggleButton.setAttribute("aria-expanded", "false");
  updateToggleLabel(toggleButton);

  toggleButton.addEventListener("click", () => {
    const expanded = toggleButton.getAttribute("aria-expanded") === "true";
    if (expanded) {
      collapseItems(hiddenItems);
      toggleButton.setAttribute("aria-expanded", "false");
    } else {
      revealItems(hiddenItems);
      toggleButton.setAttribute("aria-expanded", "true");
    }

    updateToggleLabel(toggleButton);
  });

  toggleWrap.appendChild(toggleButton);
  return toggleWrap;
};

const setupDefinition = ({ headingId, itemSelector, groupBy }) => {
  const heading = document.getElementById(headingId);
  const column = heading?.closest(".education-column");
  if (!column) return;

  const items = Array.from(column.querySelectorAll(itemSelector)).filter((item) => {
    if (headingId !== "cursos") return true;
    return Boolean(groupBy(item));
  });

  const groups = new Map();
  items.forEach((item) => {
    const key = groupBy(item);
    if (!key) return;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  });

  groups.forEach((groupItems, groupName) => {
    if (groupItems.length <= VISIBLE_ITEMS_PER_GROUP) return;

    const hiddenItems = groupItems.slice(VISIBLE_ITEMS_PER_GROUP);
    collapseItems(hiddenItems);
    const toggle = createToggleButton(groupName, hiddenItems);
    groupItems[groupItems.length - 1].insertAdjacentElement("afterend", toggle);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  GROUP_DEFINITIONS.forEach(setupDefinition);

  document.querySelectorAll(".education-toggle-btn").forEach((button) => {
    updateToggleLabel(button);
  });

  document.addEventListener("i18n:changed", () => {
    document.querySelectorAll(".education-toggle-btn").forEach((button) => {
      updateToggleLabel(button);
    });
  });
});
