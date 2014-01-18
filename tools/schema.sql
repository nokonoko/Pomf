CREATE TABLE files (
  id integer unsigned not null auto_increment,
  hash_sha1 binary(20),
  filename varchar(255),
  size integer unsigned,
  mime varchar(255),

  unique index index_files_by_id (id),
  index index_files_by_sha1_ans_size (hash_sha1, size),
  primary key (id)
);

CREATE TABLE links (
  id integer unsigned not null auto_increment,
  url varchar(31) unique not null,
  deleted bit default 0,
  deletion_key varchar(63) unique,
  deletion_time timestamp null,
  upload_time timestamp,
  file_id integer unsigned,
  owner_id integer unsigned,
  original_filename varchar(255),

  unique index index_links_by_id (id),
  unique index index_links_by_url (url),
  unique index index_links_by_deletion_key (deletion_key),
  foreign key (file_id) references files(id) on delete cascade,
  primary key(id)
);
