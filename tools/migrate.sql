CREATE TABLE pomf_new_files (
  id integer unsigned not null auto_increment,
  hash_sha1 binary(20),
  filename varchar(255),
  size integer unsigned,
  mime varchar(255),

  unique index index_files_by_id (id),
  index index_files_by_sha1 (hash_sha1),
  primary key (id)
);

CREATE TABLE pomf_new_links (
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
  primary key(id)
);

INSERT INTO pomf_new_files (id, hash_sha1, filename, size)
SELECT id, unhex(hash), orginalname, size from files;

INSERT INTO pomf_new_links (id, url, upload_time, original_filename)
SELECT id, filename, timestamp(date), orginalname from files;
