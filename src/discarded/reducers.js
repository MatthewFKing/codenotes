
switch(action.type) {
case SET_TAG_FILTERS: {
  if (state.tagFilters.length === 1) {
    let subTags = [];
    state.notes.filter(note => note.tags.indexOf(state.tagFilters[0]) !== -1)
      .map((note) => {
        return subTags = [...subTags, ...note.tags];
      });
    subTags = Array.from(new Set(subTags));
    subTags.splice((subTags.indexOf(state.tagFilters[0])),1);
    return {
      ...state,
      tagFilters: [...state.tagFilters, ...[action.tag]],
      subTagSet: subTags
    }
  } else if (state.tagFilters.length === 2) {
    return {
      ...state,
      tagFilters: [...state.tagFilters.slice(0, -1), ...[action.tag]]
    }
  } else {
    let subTags = [];
    state.notes.filter(note => note.tags.indexOf(action.tag) !== -1)
      .map((note) => {
        return subTags = [...subTags, ...note.tags];
      });
    subTags = Array.from(new Set(subTags));
    subTags.splice((subTags.indexOf(action.tag)),1);
    return {
      ...state,
      tagFilters: [...state.tagFilters, ...[action.tag]],
      subTagSet: subTags
    }
  }
}


case CLEAR_TAG_FILTERS: {
  return Object.assign({}, state, {
    tagFilters: [],
    noteFilter: ''
  })
}
}