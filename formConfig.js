// it's just a small part of our config, which has more than 300 fields.
// example of field dependancies: postal_code, city, country interact and depend on each others

export default {
  type: {
    label: gettext('Type'),
    type: 'select',
    name: 'type',
    onClick: 'onClick',
    required: true,
    options: [
      {
        label: gettext('A'),
        value: 'a'
      },
      {
        label: gettext('B'),
        value: 'b'
      },
      {
        label: gettext('C'),
        value: 'c'
      }
    ]
  },
  name: {
    label: gettext('Nom'),
    name: 'name',
    type: 'text',
    ref: 'name',
    required: true
  },
  content: {
    label: gettext('Texte'),
    type: 'simpleEditor',
    placeholder: gettext('Saisir le contenu'),
    name: 'content'
  },
  address1: {
    label: gettext('Adresse'),
    name: 'address1',
    ref: 'address1',
    type: 'text',
    onBlur: 'onChange'
  },
  address2: {
    label: gettext('Complément adresse'),
    name: 'address2',
    ref: 'address2',
    type: 'text',
    onBlur: 'onChange'
  },
  city_name: {
    label: gettext('Ville'),
    name: 'city_name',
    ref: 'city_name',
    type: 'autocomplete',
    options: [],
    onChange: 'onCityChange',
    onClick: 'onCityClick',
    required: true
  },
  city_name_complt: {
    label: gettext('Complément ville'),
    name: 'city_name_complt',
    ref: 'city_name_complt',
    type: 'text'
  },
  postal_code: {
    label: gettext('Code postal'),
    type: 'select',
    name: 'postal_code',
    ref: 'postal_code',
    onBlur: 'onChange',
    required: true
  },
  country: {
    label: gettext('Pays'),
    type: 'select',
    name: 'country',
    ref: 'country',
    onChange: 'onCountryChange',
    onClick: 'onCountryClick',
    required: true
  },
  language: {
    label: gettext('Langue'),
    type: 'select',
    name: 'language',
    options: [
      {
        label: gettext('Allemand'),
        value: 'ger'
      },
      {
        label: gettext('Anglais'),
        value: 'eng'
      },
      {
        label: gettext('Espagnol'),
        value: 'spa'
      },
      {
        label: gettext('Français'),
        value: 'fre'
      }
    ]
  },
  comment_type: {
    type: 'select',
    name: 'comment_type',
    options: [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
      { label: 'C', value: 'c' }
    ],
    label: 'Type de commentaire'
  },
  comment: {
    type: 'text',
    name: 'comment',
    label: 'Commentaire'
  }
}