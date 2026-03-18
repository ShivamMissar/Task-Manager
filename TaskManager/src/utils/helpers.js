 export function getTaskClass(completed) {
    if (completed) {
      return 'line-through text-gray-400'
    }
    return ''
  }

  export function getFilterClass(filter,applyFilter) {
    const BASE = 'px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 '
    if (applyFilter === filter) {
      return BASE + 'bg-white text-purple-600'
    }
    return BASE + 'bg-white/20 text-white hover:bg-white/30'
  }

  export function getPriorityClass(priority) {
    const BASE = ''
    if (priority === "High") {
      return "bg-red-100 text-red-700"
    }
    else if (priority === "Medium") {
      return "bg-yellow-100 text-yellow-700"
    }
    else {
      return 'bg-blue-100 text-blue-700';
    }
  }