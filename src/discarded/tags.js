import {
  RECEIVE_TAGS,
  SET_TAG_FILTERS,
  SET_SEARCH_FILTER,
  CLEAR_TAG_FILTERS,
  SET_NOTE_FILTER,
  SET_CATEGORY
} from '../actions/note';

export default function tags(state = initialState, action) {
  switch(action.type) {
    case RECEIVE_TAGS: {
      let tagList = [];
      if (state.notes) {
        state.notes.map(note => {
          return tagList = [...tagList, ...note.tags];
        });
        return {
          ...state, tags: Array.from(new Set(tagList))
        }
      } else {
        return state
      }
    }

    case SET_CATEGORY: {
      return Object.assign({}, state, {
        selectedCategory: action.id
      })
    }

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

    case SET_NOTE_FILTER: {
      return Object.assign({}, state, {
        noteFilter: action.id
      })
    }

    case SET_SEARCH_FILTER: {
      return Object.assign({}, state, {
        searchQuery: action.text
      });
    }
  }
}